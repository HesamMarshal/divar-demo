const { isValidObjectId, Types } = require("mongoose");
const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");

const OptionModel = require("../option/option.model");
const PostModel = require("./post.model");

class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }
}
module.exports = new PostService();
