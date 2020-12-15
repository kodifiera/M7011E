// Third party plugins
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import expressPino from "express-pino-logger";
import pino from "pino";
import cors from "cors";
import helmet from "helmet";
// Custom dependencies
import Store from "./helpers/store.js";
import Users from "./routes/users.js";
import Simulator from "./routes/simulator.js";

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
app.use(cors());
app.use(helmet());
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
app.use("/uploads", express.static("/uploads"));
app.use("/users", Users(store, logger));
app.use("/simulator", Simulator(store, logger));

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

/**
 * Perform a request that automatically catches and returns exceptions as well as
 * optionally returns successful request.
 * @param {*} res Express Res object.
 * @param {*} fun The request function to perform.
 * @param {boolean} Automatically send sucessful returned result as JSON  - Default: true
 */
export const performRequestFunction = async (res, fun, sendJsonAuto = true) => {
	try {
		const result = await fun();
		if (!sendJsonAuto) return result;
		res.json(result);
	} catch (error) {
		logger.error(error);
		res.status(error.statusCode || 500).json({ error });
	}
};
