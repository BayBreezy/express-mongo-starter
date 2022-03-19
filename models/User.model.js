const { Schema, model } = require("mongoose");

const roleSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const userSchema = new Schema(
	{
		username: String,
		email: {
			type: String,
			required: true,
		},
		password: String,
		resetPasswordToken: String,
		confirmationToken: String,
		confirmed: {
			type: Boolean,
			default: false,
		},
		blocked: {
			type: Boolean,
			default: false,
		},
		role: roleSchema,
	},
	{ timestamps: true }
);

const RoleModel = model("Role", roleSchema);
const UserModel = model("User", userSchema);

module.exports = {
	RoleModel,
	UserModel,
};
