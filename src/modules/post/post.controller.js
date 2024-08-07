const autoBind = require("auto-bind");

const {
  PostMessage,
  CategoryMessage,
} = require("../../common/messages/messages");
const HttpCodes = require("http-codes");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");

class CategoryController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = postService;
  }

  async createPostPage(req, res, next) {
    try {
      let { slug } = req.query;
      let showBack = false;
      let options;

      let match = { parent: null };
      if (slug) {
        slug = slug.trim();
        showBack = true;

        const category = await CategoryModel.findOne({ slug });

        if (!category)
          throw new createHttpError.NotFound(CategoryMessage.NotFound);

        options = await this.#service.getCategoryOptions(category._id);
        if (options.length === 0) options = null;
        match = { parent: category._id };
      }
      const categories = await CategoryModel.aggregate([
        {
          $match: match,
        },
      ]);

      res.render("./pages/panel/create-post.ejs", {
        categories,
        showBack,
        options,
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      console.log(req.body);
      const { name, icon, slug, parent } = req.body;
      // await this.#service.create({ name, icon, slug, parent });

      // add to database status 201
      return res.status(HttpCodes.CREATED).json({
        messages: PostMessage.CreatedSuccessfully,
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
        messages: PostMessage.Deleted,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CategoryController();
