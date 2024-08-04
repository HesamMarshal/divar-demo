const { Router } = require("express");
const optionController = require("./option.controller");

const router = Router();
router.post("/", optionController.create);
router.get("/by-category/:categoryId", optionController.findByCategoryId);
router.get("/by-category-slug/:slug", optionController.findBySlug);
router.get("/:id", optionController.findById);
router.get("/", optionController.find);

router.delete("/:id", optionController.removeById);
router.put("/:id", optionController.update);

module.exports = {
  OptionRouter: router,
};
