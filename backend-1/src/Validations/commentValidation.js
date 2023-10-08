const Joi = require("joi");

const validateCreate = (payload) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
    recipe_id: Joi.number().required(),
    user_id: Joi.number().required(),
  });
  return schema.validate(payload);
};

const validateUpdate = (payload) => {
  const schema = Joi.object({
    comment: Joi.string().required(),
    user_id: Joi.number().required(),
  });
  return schema.validate(payload);
};

module.exports = { validateCreate, validateUpdate };
