const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Function used to sign user token for 30days
 * @param {*} Object
 * @returns String token
 */
const generateToken = (user) => {
	return new Promise(async (resolve, reject) => {
		jwt.sign(
			{
				...user,
			},
			process.env.PK,
			{ audience: user.id, expiresIn: "30d", issuer: "myapi" },
			function (err, token) {
				if (err) reject(err);
				resolve(token);
			}
		);
	});
};

/**
 * Function used to verify a token
 *
 * @param {*} token token string
 * @returns object
 */
const verifyToken = (token) => {
	return new Promise(async (resolve, reject) => {
		try {
			const verred = jwt.verify(token, process.env.PK);
			resolve(verred);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	generateToken,
	verifyToken,
};
