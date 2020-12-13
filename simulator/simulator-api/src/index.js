import express from "express";
import Service from "./service.js";
import externalRequests, {
	getTemp,
	getWind,
	getConsumption,
	getPrice,
} from "./externalRequests.js";

const app = express();
const port = process.env.PORT || 8081;
const localhost = process.env.NODE_ENV === "production" ? false : true;

app.listen(port, async () => {
	console.info(`Example app listening at http://localhost:${port}`);
	const service = Service(localhost);
	service.start(60);
});

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization",
	);
	if (req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
		return res.status(200).json({});
	}
	next();
});

app.get("/", async (req, res) => {
	res.status(200);
	res.json("ok");
});

app.get("/all", async (req, res) => {
	try {
		const response = await externalRequests();
		res.json(response);
	} catch (error) {
		console.error(error);
	}
});

app.get("/temp", async (req, res) => {
	try {
		const response = await getTemp();
		res.send("" + response);
	} catch (error) {
		console.error(error);
	}
});

app.get("/wind", async (req, res) => {
	try {
		const response = await getWind();
		res.send("" + response);
	} catch (error) {
		console.error(error);
	}
});

app.get("/consumption", async (req, res) => {
	try {
		const response = await getConsumption();
		res.send("" + response);
	} catch (error) {
		console.error(error);
	}
});

app.get("/price", async (req, res) => {
	try {
		const response = await getPrice();
		res.json(response);
	} catch (error) {
		console.error(error);
	}
});
