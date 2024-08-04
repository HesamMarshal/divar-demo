const autoBind = require("auto-bind");
const OptionModel = require("./option.model");
const { isValidObjectId, Types } = require("mongoose");
const createHttpError = require("http-errors");
const {
  OptionMessage,
  CategoryMessage,
} = require("../../common/messages/messages");
const { default: slugify } = require("slugify");
const categoryService = require("../category/category.service");
const { isTrue, isFalse } = require("../../common/utils/functions");

class OptionService {
  #model;
  #cateoryService;

  constructor() {
    autoBind(this);
    this.#model = OptionModel;
    this.#cateoryService = categoryService;
  }

  // Create an Option
  async create(optionDto) {
    const category = await this.#cateoryService.checkExistById(
      optionDto.category
    );
    optionDto.category = category._id;

    optionDto.key = slugify(optionDto.key, {
      trim: true,
      replacement: "_",
      lower: true,
    });

    await this.alreadyExistByCategoryKey(optionDto.key, category._id);

    // checks if enum is string create a array based on it.
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
      //  if enum is not an array create an empty array
    } else if (typeof optionDto.enum !== "array") {
      optionDto.enum = [];
    }

    optionDto.required = isTrue(optionDto?.required);

    const option = await this.#model.create(optionDto);

    return option;
  }

  // Find options
  async find() {
    const options = await this.#model
      .find({}, { __v: 0 }, { sort: { _id: -1 } })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
    return options;
  }

  async findById(id) {
    return await this.checkOptionExistById(id);
  }

  async findByCategoryId(category) {
    return await this.#model
      .find({ category }, { __v: 0 })
      .populate([{ path: "category", select: { name: 1, slug: 1 } }]);
  }

  async findByCategorySlug(slug) {
    const options = await this.#model.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },

      {
        $addFields: {
          categorySlug: "$category.slug",
          categoryName: "$category.name",
          categoryIcon: "$category.icon",
        },
      },
      {
        $project: {
          category: 0,

          // it is possible to use below
          // "category._id": 0,
          // "category.parent": 0,
          // "category.parents": 0,
          // "category.slug": 0,
          __v: 0,
        },
      },
      {
        $match: {
          categorySlug: slug,
        },
      },
    ]);

    return options;
  }

  // Remove Options
  async removeById(id) {
    await this.checkOptionExistById(id);
    return await this.#model.deleteOne({ _id: id });
  }

  // Update an option

  async update(id, optionDto) {
    const oldOption = await this.checkOptionExistById(id);

    if (optionDto.category && isValidObjectId(optionDtoption.category)) {
      const category = await this.#cateoryService.checkExistById(
        optionDto.category
      );
      optionDto.category = category._id;
    } else {
      delete optionDto.category;
    }

    if (optionDto.slug) {
      optionDto.key = slugify(optionDto.key, {
        trim: true,
        replacement: "_",
        lower: true,
      });

      // TODO: refactor this lines of code
      //  const categoryId = optionDto?.category ? oldOption.category
      let categoryId = oldOption.category;
      if (optionDto.category) categoryId = optionDto.category;

      await this.alreadyExistByCategoryKey(optionDto.key, categoryId);
    }

    // checks if enum is string create a array based on it.
    if (optionDto?.enum && typeof optionDto.enum === "string") {
      optionDto.enum = optionDto.enum.split(",");
      //  if enum is not an array delete enum
    } else if (!Array.isArray(optionDto.enum)) delete optionDto.enum;

    optionDto.required = isTrue(optionDto?.required);

    await this.#model.updateOne({ _id: id }, { $set: optionDto });

    return option;
  }

  // helper functions
  // TODO: function name is not clear
  async checkOptionExistById(id) {
    const option = await this.#model.findById(id);
    if (!option) throw new createHttpError.NotFound(OptionMessage.NotFound);
    return option;
  }

  // TODO: function name is not clear
  async alreadyExistByCategoryKey(key, category) {
    const isExist = await this.#model.findOne({ category, key });
    if (isExist) throw new createHttpError.Conflict(OptionMessage.AlreadyExist);
    return null;
  }
}
module.exports = new OptionService();
