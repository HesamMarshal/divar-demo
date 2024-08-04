const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const { CategoryMessage } = require("../../common/messages/messages");
const HttpCodes = require("http-codes");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }
  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      await this.#service.create({ name, icon, slug, parent });

      // add to database status 201
      return res.status(HttpCodes.CREATED).json({
        messages: CategoryMessage.CreatedSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const categories = await this.#service.find();

      return res.status(HttpCodes.OK).json({
        categories,
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id } = req.params;
      await this.#service.remove(id);

      return res.status(HttpCodes.OK).json({
        messages: CategoryMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CategoryController();
