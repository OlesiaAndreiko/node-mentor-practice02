const Joi = require("joi");
const HttpError = require("../helpers/HttpError");

const schemaAddUser = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
    avatar: Joi.string(),
  });

  const schemaLoginUser = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(4).required(),
    avatar: Joi.string(),
  });


  const validateAddUser = (req, __, next) => {
    const { error } = schemaAddUser.validate(req.body);
    console.log(error);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  const validateLoginUser = (req, __, next) => {
    const { error } = schemaLoginUser.validate(req.body);
    console.log(error);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };
  
  module.exports = {
    validateAddUser, 
    validateLoginUser,
  };
  