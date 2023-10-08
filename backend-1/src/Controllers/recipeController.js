const service = require("../Services/recipeService");
const {
  validateCreate,
  validateUpdate,
} = require("../Validations/recipeValidation");

const getAllRecipes = async (req, res) => {
  const { page, limit } = req.query;
  await service
    .getAllRecipe(page, limit)
    .then((recipe) => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "success get recipe",
        data: recipe,
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        statusCode: 422,
        message: err.message,
      });
    });
};

const getRecipeByUser = async (req, res) => {
  const { id } = req.user;
  const { page, limit } = req.query;
  service
    .getByUser(id, page, limit)
    .then((recipe) => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "success get recipe",
        data: recipe,
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        statusCode: 422,
        message: err.message,
        data: [],
      });
    });
};

const createRecipe = async (req, res) => {
  const { id } = req.user;
  const { category, title, ingredients, steps } = req.body;
  const food_images = req.file?.filename;
  const newRecipe = {
    category,
    title,
    ingredients,
    steps,
    food_images,
    user_id: id,
  };

  const { error } = validateCreate(newRecipe);
  if (error) {
    res.status(422).json({
      success: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }

  service
    .Create(newRecipe)
    .then((recipe) => {
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "recipe created",
        data: recipe,
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        statusCode: 422,
        message: err.message,
      });
    });
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await service.getById(id);
  if (!recipe) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "recipe not found",
    });
    return;
  }

  const { error } = validateUpdate(req.body);
  if (error) {
    res.status(422).json({
      success: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }

  await service.Update(id, req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "recipe updated",
  });
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const recipe = await service.getById(id);
  if (!recipe) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "recipe not found",
    });
    return;
  }
  await service.Delete(id);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "recipe deleted",
  });
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  service
    .getById(id)
    .then((recipe) => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "success get recipe",
        data: recipe,
      });
    })
    .catch((err) => {
      res.status(422).json({
        success: false,
        statusCode: 422,
        message: err.message,
        data: [],
      });
    });
};

module.exports = {
  getAllRecipes,
  getRecipeByUser,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};
