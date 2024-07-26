const autoBind = require("auto-bind");
const authService = require("./auth.service");

const NodeEnv = require("../../common/constant/env.enum");
const { AuthMessage } = require("../../common/messages/messages");
const CookieNames = require("../../common/constant/cookie.enum");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = authService;
  }

  async sendOTP(req, res, next) {
    try {
      const { mobile } = req.body;
      const user = await this.#service.sendOTP(mobile);
      return res.json({
        message: AuthMessage.SendOtpSuccessfully,
        otp: user.otp.code,
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
        .cookie(CookieNames.AccessToken, token, {
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
      return res.clearCookie(CookieNames.AccessToken).status(200).json({
        message: AuthMessage.LogoutSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
