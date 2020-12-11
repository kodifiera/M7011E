import express from "express";
import wind from "./wind.js";

const app = express();
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
	res.status(200);
	res.send("" + wind());
});

app.listen(port, () => {
	console.info(`Example app listening at http://localhost:${port}`);
});
