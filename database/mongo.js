const mongoose = require("mongoose");
require("dotenv").config();

mongoose
	.connect(process.env.MONGO_URI + process.env.MONGO_DB_NAME)
	.then(() => console.log("Connected to DB"))
	.catch((e) => console.log(e));
