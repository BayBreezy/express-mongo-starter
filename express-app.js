const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(morgan("combined"));

//Set static folder
app.use(express.static("./public"));

//Welcome page
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "welcome.html"));
});
///Reset password
app.get("/reset-password", (req, res) => {
	res.sendFile(path.join(__dirname, "public", "pages", "resetpassword.html"));
});

//Get routes for the API
app.use("/", require("./routes"));

//global error handler
app.use((err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	res.status(err.statusCode).json({
		error: err.message,
	});
});

module.exports = app;
