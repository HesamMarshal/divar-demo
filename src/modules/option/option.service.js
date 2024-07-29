const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const { OptionMessage } = require("../../common/messages/messages");
const { default: slugify } = require("slugify");

class OptionService {
  #model;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
  }
  async create(optionDto) {}
  async find() {}

  async checkExistById(id) {}
}
module.exports = new OptionService();
