const Joi = require("joi");

const validateCreate = (payload) => {
  const schema = Joi.object({
    category: Joi.valid("food", "drink").required(),
    title: Joi.string().required(),
    ingredients: Joi.string().required(),
    steps: Joi.string().required(),
    food_images: Joi.string().allow(null, ""),
    user_id: Joi.number().required(),
  });
  return schema.validate(payload);
};

const validateUpdate = (payload) => {
  const schema = Joi.object({
    category: Joi.valid("food", "drink").required(),
    title: Joi.string().required(),
    ingredients: Joi.string().required(),
    steps: Joi.string().required(),
    food_imagea: Joi.string().allow(null, ""),
    user_id: Joi.number().required(),
  });
  return schema.validate(payload);
};

module.exports = { validateCreate, validateUpdate };
