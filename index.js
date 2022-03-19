//Imports
require("dotenv").config();
const PORT = process.env.PORT;
//import http server
const httpServer = require("./socket");
//Connect to mongo db
require("./database/mongo.js");

//Start listening
httpServer.listen(PORT, "0.0.0.0", () => {
	console.log(`Server running on ${PORT} 🚀🚀`);
});
