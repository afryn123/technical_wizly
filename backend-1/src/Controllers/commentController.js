const service = require("../Services/commentService");
const {
  validateCreate,
  validateUpdate,
} = require("../Validations/commentValidation");

const getCommentByRecipeId = async (req, res) => {
  const { recipe_id } = req.params;
  const { page, limit } = req.query;

  await service
    .getByRecipeId(recipe_id, page, limit)
    .then((result) => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        data: result,
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

const createComment = async (req, res) => {
  const { recipe_id } = req.params;
  const { id } = req.user;
  const { comment } = req.body;
  const newComment = { comment, user_id: id, recipe_id };
  console.log(newComment);

  const { error } = validateCreate(newComment);

  if (error) {
    res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }

  service
    .Create(newComment)
    .then(() => {
      res.status(201).json({
        success: true,
        statusCode: 201,
        message: "comment created",
        data: { comment },
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

const updateComment = async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const user_id = req.user.id;
  const updateComment = { comment, user_id };
  const isAvailable = await service.getById(id);
  if (!isAvailable) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "comment not found",
    });
    return;
  } else if (user_id !== isAvailable.user_id) {
    res.status(403).json({
      success: false,
      statusCode: 403,
      message: "Not match user",
    });
    return;
  }
  const { error } = validateUpdate(updateComment);
  if (error) {
    res.status(422).json({
      status: false,
      statusCode: 422,
      message: error.details[0].message,
    });
    return;
  }

  await service
    .Update(id, updateComment)
    .then(() => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "comment updated",
        data: { comment },
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

const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await service.getById(id);
  if (!comment) {
    res.status(404).json({
      success: false,
      statusCode: 404,
      message: "comment not found",
    });
    return;
  }

  service
    .Delete(id)
    .then(() => {
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: "comment deleted",
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

module.exports = {
  getCommentByRecipeId,
  createComment,
  updateComment,
  deleteComment,
};
