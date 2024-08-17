const { Router } = require("express");
const adsController = require("./ads.controller");
const { upload } = require("../../common/utils/multer");
const Authorization = require("../../common/guard/authorization.guard");

const router = Router();

router.get("/create", Authorization, adsController.createPostPage);
router.post(
  "/create",
  Authorization,
  upload.array("images", 10),
  adsController.create
);

router.get("/my", Authorization, adsController.findMyPosts);
router.delete("/delete/:id", Authorization, adsController.remove);
router.get("/:id", adsController.showPost);

module.exports = {
  AdsRouter: router,
};
