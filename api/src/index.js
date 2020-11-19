import express from "express";
import axios from "axios";

const app = express();
const port = process.env.PORT || 8080;
const localhost = process.env.NODE_ENV === "production" ? false : true;

app.get("/", async (req, res) => {
	res.status(200);
	res.json("api");
});

app.get("/test", async (req, res) => {
	try {
		const url = "http://" + (localhost ? "localhost:4005" : "el-price");
		const response = await axios.get(url);
		res.status(200);
		res.send("" + response.data);
	} catch (error) {
		console.error(error);
	}
});

app.listen(port, async () => {
	console.info(`Example app listening at http://localhost:${port}`);
});
