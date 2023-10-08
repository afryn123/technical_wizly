const { Comment } = require("../Models");

const Create = (value) => Comment.create(value);
const getByRecipeId = (recipe_id, page = 1, limit = 10) =>
  Comment.findAll({
    where: { recipe_id },
    offset: (page - 1) * limit,
    limit: limit,
  });
const getById = (id) =>
  Comment.findOne({ where: { id }, attribute: ["id", "comment", "user_id"] });
const Update = (id, value) => Comment.update(value, { where: { id } });
const Delete = (id) => Comment.destroy({ where: { id } });

module.exports = {
  Create,
  getByRecipeId,
  getById,
  Update,
  Delete,
};
