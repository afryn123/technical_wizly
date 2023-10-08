const { Recipe } = require("../Models");

const Create = (value) => Recipe.create(value);
const getAllRecipe = (page = 1, limit = 10) =>
  Recipe.findAll({
    attributes: ["id", "title", "food_images", "createdAt", "updatedAt"],
    offset: (page - 1) * limit,
    limit: 10,
  });

const getByUser = (user_id, page = 1, limit = 10) =>
  Recipe.findAll({
    attributes: ["id", "title", "food_images", "createdAt", "updatedAt"],
    where: { user_id },
    offset: (page - 1) * limit,
    limit: 10,
  });

const getById = (id) => Recipe.findOne({ where: { id } });
const Update = (id, value) => Recipe.update(value, { where: { id } });
const Delete = (id) => Recipe.destroy({ where: { id } });

module.exports = {
  Create,
  getAllRecipe,
  getByUser,
  getById,
  Update,
  Delete,
};
