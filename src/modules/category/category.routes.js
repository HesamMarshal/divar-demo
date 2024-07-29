const { Router } = require("express");
const categoryController = require("./category.controller");
const router = Router();

router.post("/", categoryController.create);

module.exports = {
  CategoryRouter: router,
};
