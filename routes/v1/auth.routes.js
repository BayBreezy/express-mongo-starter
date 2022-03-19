const router = require("express").Router();
const {
	ResetPassword,
	Login,
	Register,
	ConfirmEmail,
	SendConfirmEmail,
	SendPasswordReset,
} = require("../../controllers/authController");

router
	.post("/reset-password", ResetPassword)
	.post("/login", Login)
	.post("/register", Register)
	.get("/confirm-email", ConfirmEmail)
	.post("/send-confirm-email", SendConfirmEmail)
	.post("/send-passwordreset-email", SendPasswordReset);

module.exports = router;
