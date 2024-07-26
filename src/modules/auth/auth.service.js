const createHttpError = require("http-errors");
const UserModel = require("../user/user.model");
const { randomInt } = require("crypto");
const autoBind = require("auto-bind");
const jwt = require("jsonwebtoken");
const { AuthMessage } = require("../../common/messages/messages");

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
    }

    // create accsess Token
    const accessToken = this.signToken({ mobile, id: user._id });
    user.accessToken = accessToken;

    await user.save();
    return accessToken;
  }

  // Checks if user already exist using mobile
  async checkExistByMobile(mobile) {
    // if user exist returns it, else throw an error
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }

  signToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: "1y" });
  }
}

// Singleton use
module.exports = new AuthService();
