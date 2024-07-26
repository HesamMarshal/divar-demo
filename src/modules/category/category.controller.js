const autoBind = require("auto-bind");
const categoryService = require("./category.service");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = categoryService;
  }
}
module.exports = new CategoryController();
