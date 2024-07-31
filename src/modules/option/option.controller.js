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
      const { title, key, guide, enum: list, type, category } = req.body;
      await this.#service.create({
        title,
        key,
        guide,
        enum: list,
        type,
        category,
      });
      return res.status(HttpCodes.CREATED).json({
        message: OptionMessage.CreatedSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const options = await this.#service.find();
      return res.json(options);
    } catch (error) {
      next(error);
    }
  }

  async findByCategoryId(req, res, next) {
    try {
      const { categoryId } = req.params;
      const option = await this.#service.findByCategoryId(categoryId);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }

  async findById(req, res, next) {
    try {
      const { id } = req.params;
      const option = await this.#service.findById(id);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
  async findBySlug(req, res, next) {
    try {
      const { slug } = req.params;
      const option = await this.#service.findByCategorySlug(slug);
      return res.json(option);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new OptionController();
