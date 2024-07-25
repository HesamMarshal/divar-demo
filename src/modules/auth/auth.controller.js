const autoBind = require("auto-bind");
const authService = require("./auth.service");
const AuthMessage = require("./auth.messages");

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
      const result = await this.#service.checkOTP(mobile, code);
      return res.json({
        message: AuthMessage.LoggedInSuccessfully,
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
