const bcrypt = require("bcrypt");

/**
 * Method used to hash a string
 *
 * @param {*} string String
 * @returns hashedText String
 */
const Hasher = async (string) => {
	try {
		let hashedText = await bcrypt.hash(string, 12);
		return hashedText;
	} catch (error) {
		throw Error(error.message);
	}
};

/**
 * Method used to compare hashed string vs plainString
 *
 * @param {*} plainText String
 * @param {*} hashedText String
 * @returns Boolean
 */
const CompareHash = async (plainText, hashedText) => {
	try {
		const match = await bcrypt.compare(plainText, hashedText);
		return match;
	} catch (error) {
		throw Error(error.message);
	}
};

module.exports = {
	Hasher,
	CompareHash,
};
