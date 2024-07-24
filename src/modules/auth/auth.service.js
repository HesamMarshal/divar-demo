class AuthService {
  constructor() {
    autoBind(this);
  }
  async sendOTP(mobile) {}

  async checkOTP(mobile, code) {}
}

// Singleton use
module.exports = new AuthService();
