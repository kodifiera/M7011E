import express from "express";
import { Server } from "socket.io";
import api from "./api.js";

const app = express();
const io = new Server().listen(app.listen(8080));

let clients = [];

try {
	io.on("connection", (socket) => {
		clients.push(socket);
		io.emit("broadcast", clients.length + " client(s) are now connected");
		socket.emit("greeting", "Hello, your id is " + socket.client.id);
	});
	io.on("disconnection", (socket) => {
		var client = clients.indexOf(socket);
		clients.splice(client, 1);
	});
} catch (error) {
	console.error(error);
}
const getFilePath = (fileName) => {
	var filePath = new URL(fileName, import.meta.url).pathname;
	if (filePath.match(/:/) != null) {
		const index = filePath.match(/:/).index;
		filePath = filePath.slice(index + 1, filePath.length);
	}
	return filePath;
};

app.use("/api", api());
app.get("/", async function (req, res) {
	res.sendFile(getFilePath("index.html"));
});

export default app;
