const express = require("express");
const controllers = require("../Controllers");
const { Authorize } = require("../Middleware/Auth");
const commentController = controllers.commentController;

const router = express.Router();

router
  .route("/api/comments/recipe/:recipe_id")
  .get(Authorize, commentController.getCommentByRecipeId)
  .post(Authorize, commentController.createComment);

router
  .route("/api/comments/:id")
  .put(Authorize, commentController.updateComment)
  .delete(Authorize, commentController.deleteComment);

module.exports = router;
