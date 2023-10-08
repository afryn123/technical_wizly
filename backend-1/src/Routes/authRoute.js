const express = require("express");
const controllers = require("../Controllers");
const { handleUploadImage } = require("../Middleware/uploadUser");
const { Authorize } = require("../Middleware/Auth");
const authController = controllers.authController;

const router = express.Router();

router
  .route("/api/register")
  .post(handleUploadImage, authController.userRegister);

router
  .route("/api/profile/:id")
  .get(Authorize, authController.getMyProfile)
  .put(Authorize, handleUploadImage, authController.userUpdate)
  .delete(Authorize, authController.deleteUser);

router.route("/api/login").post(authController.userLogin);

module.exports = router;
