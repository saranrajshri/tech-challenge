const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

// Create a new user
const createUserValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  createUserValidator,
};
