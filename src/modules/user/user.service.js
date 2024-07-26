const createHttpError = require("http-errors");
const UserModel = require("./user.model");
const { randomInt } = require("crypto");
const autoBind = require("auto-bind");
const jwt = require("jsonwebtoken");
const AuthMessage = require("../../common/messages/messages");

class UserService {
  #model;

  constructor() {
    autoBind(this);
    this.#model = UserModel;
  }
}

// Singleton use
module.exports = new UserService();
