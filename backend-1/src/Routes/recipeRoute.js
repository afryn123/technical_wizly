const express = require("express");
const controllers = require("../Controllers");
const { handleUploadImage } = require("../Middleware/uploadFood");
const { Authorize } = require("../Middleware/Auth");
const recipeController = controllers.recipeController;

const router = express.Router();

router
  .route("/api/recipes")
  .get(recipeController.getAllRecipes)
  .post(Authorize, handleUploadImage, recipeController.createRecipe);

router
  .route("/api/recipes/:id")
  .get(Authorize, recipeController.getRecipeById)
  .put(Authorize, handleUploadImage, recipeController.updateRecipe)
  .delete(Authorize, recipeController.deleteRecipe);

router.route("/api/myrecipe").get(Authorize, recipeController.getRecipeByUser);

module.exports = router;
