const autoBind = require("auto-bind");
const authService = require("./auth.service");

const NodeEnv = require("../../common/constant/env.enum");
const AuthMessage = require("../../common/messages/auth.messages");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const result = await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async checkOTP(req, res, next) {
    try {
      const { mobile, code } = req.body;

      // checks if user entered a correct mobile and OTP
      const token = await this.#service.checkOTP(mobile, code);

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === NodeEnv.Production,
        })
        .status(200)
        .json({
          message: AuthMessage.LoggedInSuccessfully,
          token,
        });
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
