const autoBind = require("auto-bind");
const categoryService = require("./category.service");
const { CategoryMessage } = require("../../common/messages/messages");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }
  async create(req, res, next) {
    try {
      const { name, icon, slug, parent } = req.body;
      // add to database status 201
      return res.status(201).json({
        messages: CategoryMessage.CreatedSuccessfully,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CategoryController();
