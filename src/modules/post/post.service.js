const { isValidObjectId, Types } = require("mongoose");
const autoBind = require("auto-bind");
const createHttpError = require("http-errors");
const { default: slugify } = require("slugify");

const OptionModel = require("../option/option.model");
const PostModel = require("./post.model");
const { PostMessage } = require("../../common/messages/messages");

// TODO: Rename Post Service to AdsService
class PostService {
  #model;
  #optionModel;
  constructor() {
    autoBind(this);
    this.#model = PostModel;
    this.#optionModel = OptionModel;
  }

  async getCategoryOptions(categoryId) {
    const options = await this.#optionModel.find({ category: categoryId });
    return options;
  }
  async create(dto) {
    return await this.#model.create(dto);
  }
  async find(userId) {
    if (userId && isValidObjectId(userId))
      return await this.#model.find({ userId });

    throw new createHttpError.BadRequest(PostMessage.RequestNotValid);
  }
}
module.exports = new PostService();
