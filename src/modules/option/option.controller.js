const autoBind = require("auto-bind");
const optionService = require("./option.service");
const { OptionMessage } = require("../../common/messages/messages");
const HttpCodes = require("http-codes");

class OptionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = optionService;
  }
  async create(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new OptionController();
