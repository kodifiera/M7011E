import express from "express";
import wind from "./wind.js";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
	res.status(200);
	res.send("" + wind());
});

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
