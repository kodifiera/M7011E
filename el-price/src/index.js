import express from "express";
import fetchPrice from "./price.js";

const app = express();
const port = process.env.PORT || 8081;

app.get("/", async (req, res) => {
	const price = await fetchPrice();
	res.status(200);
	res.json(price);
});

app.listen(port, () => {
	console.info(`Example app listening at http://localhost:${port}`);
});
