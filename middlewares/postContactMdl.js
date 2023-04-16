const Joi = require("joi");
const HttpError = require("../helpers/HttpError");

const schemaAddContact = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required(),
});

const validateAddContact = (req, res, next) => {
  const { error } = schemaAddContact.validate(req.body);
  console.log(error);
  if (error) {
    return next(HttpError(400, error.message));
  }
  next();
};

module.exports = validateAddContact;
