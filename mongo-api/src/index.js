import express from "express";
import bodyParser from "body-parser";
import Users from "./users.js";
import store, { connect } from "./store.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use((req, res, next) => {
	console.info({
		"Requested URI Path": req.url,
		Datetime: new Date(),
		IP: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
	});
	next();
});

app.use("/users", Users(store));

app.get("/", async (req, res) => {
	try {
		res.json("ok");
		res.status(200);
	} catch (error) {
		res.send(error);
		res.status(500);
	}
});

app.listen(port, async () => {
	console.info(`Example app listening at http://localhost:${port}`);
	connect(store);
});
