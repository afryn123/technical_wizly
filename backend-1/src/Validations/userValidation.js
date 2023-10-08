const Joi = require("joi");

const validateRegister = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
    user_image: Joi.string().allow(null, ""),
  });
  return schema.validate(payload);
};

const validateUpdate = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    user_image: Joi.string().allow(null, ""),
  });
  return schema.validate(payload);
};

const validateLogin = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9]{3,30}$/)
      .required(),
  });
  return schema.validate(payload);
};

module.exports = { validateRegister, validateUpdate, validateLogin };
