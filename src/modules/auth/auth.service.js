const createHttpError = require("http-errors");
const UserModel = require("../user/user.model");
const AuthMessage = require("./auth.messages");
const { randomInt } = require("crypto");
const autoBind = require("auto-bind");

class AuthService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }

  async sendOTP(mobile) {
    const user = await this.#model.findOne({ mobile });

    //  Create OTP
    const now = new Date().getTime();
    const otp = {
      code: randomInt(10000, 99999),

      //  2 mins: 2 * 60 * 1000 = 120000 ms
      expiresIn: now + 120000,
    };

    // Check if user not exist create new user,
    // if user exsit check for OTP and expires
    if (!user) {
      const newUser = await this.#model.create({ mobile, otp });
      return newUser;
    }

    //  if user ask for new OTP code before the current one expires
    if (user.otp && user.otp.expiresIn > now)
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);

    // Save the OTP change in DB
    user.otp = otp;
    await user.save();
    return user;
  }

  async checkOTP(mobile, code) {
    // check if user exsits or not
    const user = await this.checkExistByMobile(mobile);

    const now = new Date().getTime();

    // checks if OTP expired
    if (user?.otp?.expiresIn < now)
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeExpired);

    // Checks if user entered a correct OPT code
    if (user?.otp?.code !== code)
      throw new createHttpError.Unauthorized(AuthMessage.OtpCodeIsIncorrect);

    // if user mobile not verified yet, verify it.
    if (!user.verifiedMobile) {
      user.verifiedMobile = true;
      user.save();
    }

    return user;
  }

  // Checks if user already exist using mobile
  async checkExistByMobile(mobile) {
    // if user exist returns it, else throw an error
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }
}

// Singleton use
module.exports = new AuthService();
