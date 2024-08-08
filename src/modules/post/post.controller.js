const autoBind = require("auto-bind");

const {
  PostMessage,
  CategoryMessage,
} = require("../../common/messages/messages");
const HttpCodes = require("http-codes");
const { Types } = require("mongoose");
const postService = require("./post.service");
const CategoryModel = require("../category/category.model");
const createHttpError = require("http-errors");
const { default: axios } = require("axios");
const { getAddressDetail } = require("../../common/utils/http");
const { removePropertyInObject } = require("../../common/utils/functions");
const utf8 = require("utf8");

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
      let options, category;

      let match = { parent: null };
      if (slug) {
        slug = slug.trim();
        showBack = true;

        category = await CategoryModel.findOne({ slug });

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
        category: category?._id.toString(),
      });
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      const {
        title_post: title,
        description: content,
        // lat,
        // lng,
        category,
      } = req.body;

      // map.ir is not working I used it as default
      const lat = 52.471905;
      const lng = 29.6348;

      const { province, city, district, address, coordinate } =
        await getAddressDetail(lat, lng);

      const options = removePropertyInObject(req.body, [
        "title_post",
        "description",
        "lat",
        "lng",
        "category",
        "images",
      ]);

      await this.#service.create({
        title,
        content,
        category,
        province,
        city,
        district,
        address,
        coordinate,
        images: [],
        options,
      });

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
