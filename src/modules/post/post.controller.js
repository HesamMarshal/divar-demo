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
  success_message;
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
      const userId = req.user._id;
      const images = req?.files?.map((image) => image?.path?.slice(7));
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

      // encode the option with utf8
      // TODO: create a helper function
      for (let key in options) {
        let value = options[key];
        delete options[key];
        key = utf8.decode(key);
        options[key] = value;
      }

      await this.#service.create({
        userId,
        title,
        content,
        category,
        province,
        city,
        district,
        address,
        coordinate,
        images,
        options,
      });
      this.success_message = PostMessage.CreatedSuccessfully;
      return res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }

  async findMyPosts(req, res, next) {
    try {
      const userId = req.user._id;
      const posts = await this.#service.find(userId);

      res.render("./pages/panel/posts", {
        posts,
        success_message: this.success_message,
        error_message: null,
      });
      this.success_message = null;
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: postId } = req.params;
      await this.#service.remove(postId);

      this.success_message = PostMessage.Deleted;
      res.redirect("/post/my");
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new CategoryController();
