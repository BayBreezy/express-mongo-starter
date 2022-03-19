const { Hasher } = require("../helpers/utilities");
const { UserValidator } = require("../helpers/validators");
const {
	createUser,
	searchSingleUser,
	updateUser,
} = require("../services/User.services");
const { SendTemplatedEmail } = require("../helpers/mailer/mailer.js");
const { v4: uuidv4 } = require("uuid");

/**
 * Controller used to reset a user's password
 *
 */
const ResetPassword = async (req, res, next) => {
	try {
		return res.status(200).json({ meassage: "updated" });
	} catch (error) {
		next(error);
	}
};

/**
 * Controller used to log a user in
 *
 */
const Login = async (req, res, next) => {
	try {
		return res.status(200).json({ meassage: "User logged in" });
	} catch (error) {
		next(error);
	}
};

/**
 * Controller used to register a user
 */
const Register = async (req, res, next) => {
	try {
		//Validate data
		await UserValidator.validateAsync(req.body, {
			allowUnknown: true,
			abortEarly: true,
		});
		//Check if user exists
		let userExist = await searchSingleUser({ email: req.body.email });
		if (userExist)
			return res.status(400).json({ error: "Email already taken" });

		if (req.body.password) req.body.password = await Hasher(req.body.password);
		//Create confirmaton token
		const confirmationToken = uuidv4();
		let user = await createUser({ ...req.body, confirmationToken });
		//Send email
		let info = await SendTemplatedEmail("confirmation.ejs", {
			to: user.email,
			link:
				process.env.API_WEB_LINK +
				`/api/v1/auth/confirm-email?token=${confirmationToken}&email=${user.email}`,
			subject: "Confirm Account",
		});
		return res.status(200).json({ user, info });
	} catch (error) {
		next(error);
	}
};

/**
 * Controller used to confirm the user's email address
 */
const ConfirmEmail = async (req, res, next) => {
	const { token, email } = req.query;
	if (!token || !email)
		return res.status(400).json({ error: "Invalid request" });

	try {
		//Get the user by email
		const user = await searchSingleUser({ email, confirmationToken: token });
		if (!user) return res.status(404).json({ error: "User not found" });
		//Check if the user is already confirmed
		if (user.confirmed)
			return res.status(202).redirect("/?q=Account already activated.");

		//If found, update user to confirmed
		await updateUser(user._id, { confirmed: true });

		res.redirect("/?q=Account activated");
		next();
	} catch (error) {
		next(error);
	}
};

/**
 * Controller used to send confirm email to user
 */
const SendConfirmEmail = async (req, res, next) => {
	try {
		return res.status(200).json({ meassage: "Confirmation Email Sent" });
	} catch (error) {
		next(error);
	}
};

/**
 * Controller used to send confirm email to user
 */
const SendPasswordReset = async (req, res, next) => {
	try {
		//Generate password reset token
		const resetPasswordToken = uuidv4();
		//Save token to db

		//Send email
		let info = await SendTemplatedEmail("reset-password.ejs", {
			...req.body,
			resetLink:
				process.env.API_WEB_LINK +
				`/reset-password?token=${resetPasswordToken}`,
		});
		return res
			.status(200)
			.json({ meassage: "Password Reset Email Sent", info });
	} catch (error) {
		next(error);
	}
};

module.exports = {
	ResetPassword,
	Login,
	Register,
	ConfirmEmail,
	SendConfirmEmail,
	SendPasswordReset,
};
