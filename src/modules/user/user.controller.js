const autoBind = require("auto-bind");
const userService = require("./user.service");

const NodeEnv = require("../../common/constant/env.enum");
const AuthMessage = require("../../common/messages/messages");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }
}

module.exports = new UserController();
