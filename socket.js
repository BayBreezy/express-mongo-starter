const app = require("./express-app.js");
const { createServer } = require("http");
const { Server } = require("socket.io");
//create http server from the express app
const httpServer = createServer(app);
//create socket io instance
const io = new Server(httpServer, {
	cors: {
		origin: "*",
	},
});

io.on("connection", (socket) => {
	io.emit("welcome", {
		message: "Welcome new user 😎",
	});
	//Add whatever events you want here
});

module.exports = httpServer;
