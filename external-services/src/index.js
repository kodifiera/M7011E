import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import morgan from "morgan";
import temp from "./temp.js";
import wind from "./wind.js";
import elConsumption from "./el-consumption.js";
import elPrice from "./el-price.js";
import all from "./all.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan("tiny"));

app.listen(port, async () => {
	console.info(`Example app listening at http://localhost:${port}`);
});

app.use("/temp", temp);
app.use("/wind", wind);
app.use("/el-consumption", elConsumption);
app.use("/el-price", elPrice);
app.use("/all", all);

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
		console.error(error);
		res.status(error.statusCode || 500).json({ error });
	}
};
