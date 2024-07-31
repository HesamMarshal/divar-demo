const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const {
  OptionMessage,
  CategoryMessage,
} = require("../../common/messages/messages");
const { default: slugify } = require("slugify");
const CategoryModel = require("../category/category.model");

class OptionService {
  #model;
  #categoryModel;
  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#categoryModel = CategoryModel;
  }
  async create(optionDto) {
    const category = await this.checkExistById(optionDto.category);
    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });
    optionDto.category = category._id;
    await this.alreadyExistByCategoryKey(optionDto.key, category._id);

    // checks if enum is string create a array based on it.
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
      //  if enum is not an array create an empty array
    } else if (typeof optionDto.enum !== "array") {
      optionDto.enum = [];
    }
    const option = await this.#model.create(optionDto);

    return option;
  }
  async find() {
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }

  async findById(id) {
    return await this.checkExistById(id);
  }

  async findByCategoryId(category) {
    return await this.#model
      .find({ category }, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }

  // TODO: function name is not clear
  async checkExistById(id) {
    const category = await this.#categoryModel.findById(id);
    console.log(category);
    if (!category) throw new createHttpError.NotFound(CategoryMessage.NotFound);
    return category;
  }

  // TODO: function name is not clear
  async alreadyExistByCategoryKey(key, category) {
    const isExist = await this.#model.findOne({ category, key });
    if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }
}
module.exports = new OptionService();
