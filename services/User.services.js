const { UserModel } = require("../models/User.model");

module.exports = {
	/**
	 * Counts the number of users inthe database
	 *
	 * @returns Number
	 */
	countUsers: async () => await UserModel.estimatedDocumentCount(),

	/**
	 * Gets a single user by ID
	 *
	 * @param {*} id String
	 * @returns User Document
	 */
	getUserById: async (id) => {
		try {
			return await UserModel.findById(id);
		} catch (error) {
			throw new Error(error.message);
		}
	},
	/**
	 * Get all users
	 * @returns Array
	 */
	getAllUsers: async () => await UserModel.find(),
	/**
	 * Get all users by search terms
	 *
	 * @param {*} object Object with search params
	 * @returns Array
	 */
	searchUsers: async (object) => await UserModel.find(object),
	/**
	 * Get a signle user by search term
	 *
	 * @param {*} object Object with search params
	 * @returns Array
	 */
	searchSingleUser: async (object) => await UserModel.findOne(object),
	/**
	 * Creates a new user from the object passed
	 *
	 * @param {*} userObject user object
	 * @returns Object
	 */
	createUser: async (userObject) => {
		let user = UserModel(userObject);
		await user.save();
		return user;
	},
	/**
	 * Finds a user by the given ID and update their profile
	 *
	 * @param {*} id String
	 * @param {*} object user data
	 * @returns Object
	 */
	updateUser: async (id, object) =>
		await UserModel.findByIdAndUpdate(id, object, { new: true }),
	/**
	 * Deletes a user by the ID passed in
	 *
	 * @param {*} id String
	 * @returns Object
	 */
	deleteUser: async (id) => await UserModel.findByIdAndDelete(id),
};
