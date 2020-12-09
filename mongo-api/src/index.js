// Third party plugins
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import expressPino from "express-pino-logger";
import pino from "pino";
// Custom dependencies
import Store from "./store.js";
import Users from "./users.js";

// Config the .env
dotenv.config();
// Define the Express server and port.
const app = express();
const port = process.env.PORT || 8080;
// Configure the logger
const logger = pino({ level: process.env.LOG_LEVEL || "info", prettyPrint: { colorize: true } });
const expressLogger = expressPino({ logger });
// Initialize the databse store object. Connect before use (in app.listen()).
const store = Store();

/**
 * Express middlewares
 */
app.use(bodyParser.json());
app.use(expressLogger);

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

/**
 * Use API sub-endpoints
 */
app.use("/users", Users(store, logger));

/**
 * Test to connect to the api endpoint
 */
app.get("/", async (req, res) => {
	try {
		res.json("ok");
	} catch (error) {
		logger.error(error);
		res.status(500).send(error);
	}
});

/**
 * Start the express server
 */
app.listen(port, async () => {
	logger.info(`Example app listening at http://localhost:${port}`);
	try {
		await store.connectStore();
		logger.info("Database connected");
	} catch (error) {
		logger.error(error);
	}
});
