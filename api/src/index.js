import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8080;
const localhost = process.env.NODE_ENV === "production" ? false : true;

app.listen(port, async () => console.info(`Example app listening at http://localhost:${port}`));

app.get("/", async (req, res) => {
	res.status(200);
	res.json("ok");
});

app.get("/db", async (req, res) => {
	try {
		const url = "http://" + (localhost ? "localhost:4001" : "mongo-api");
		const response = await axios.get(url);
		res.status(200);
		res.send("" + response.data);
	} catch (error) {
		console.error(error);
	}
});

app.get("/temp", async (req, res) => {
	try {
		const url = "http://" + (localhost ? "localhost:4002" : "temperature");
		const response = await axios.get(url);
		res.status(200);
		res.send("" + response.data);
	} catch (error) {
		console.error(error);
	}
});

app.get("/wind", async (req, res) => {
	try {
		const url = "http://" + (localhost ? "localhost:4003" : "wind");
		const response = await axios.get(url);
		res.status(200);
		res.send("" + response.data);
	} catch (error) {
		console.error(error);
	}
});

app.get("/consumption", async (req, res) => {
	try {
		const url = "http://" + (localhost ? "localhost:4004" : "el-consumption");
		const response = await axios.get(url);
		res.status(200);
		res.send("" + response.data);
	} catch (error) {
		console.error(error);
	}
});

app.get("/price", async (req, res) => {
	try {
		const url = "http://" + (localhost ? "localhost:4005" : "el-price");
		const response = await axios.get(url);
		res.status(200);
		res.json(response.data);
	} catch (error) {
		console.error(error);
	}
});
