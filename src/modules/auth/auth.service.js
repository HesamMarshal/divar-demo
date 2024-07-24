const createHttpError = require("http-errors");
const UserModel = require("../user/user.model");
const AuthMessage = require("./auth.messages");
const { randomInt } = require("crypto");

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
      expiresIn: now + 1000 * 60 * 2,
    };

    // Check if user not exist create new user,
    // if user exsit check for otp and expires
    if (!user) {
      const newUser = await this.#model.create({ mobile, otp });
      return newUser;
    }
    if (user.otp && user.otp.expiresIn > now)
      throw new createHttpError.BadRequest(AuthMessage.OtpCodeNotExpired);

    user.otp = otp;
    await user.save();
    return user;
  }

  async checkOTP(mobile, code) {}

  async checkExistByMobile(mobile) {
    const user = await this.#model.findOne({ mobile });
    if (!user) throw new createHttpError.NotFound(AuthMessage.NotFound);
    return user;
  }
}

// Singleton use
module.exports = new AuthService();
