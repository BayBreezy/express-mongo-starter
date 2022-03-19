const Joi = require("joi");

const UserValidator = Joi.object({
	username: Joi.string().min(2).allow(""),
	email: Joi.string().email().required(),
	password: Joi.string().min(7).allow(""),
});

module.exports = {
	UserValidator,
};
