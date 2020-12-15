import express from "express";
import NodeCache from "node-cache";
import axios from "axios";
import { performRequestFunction } from "./index.js";
const router = express.Router();
const cache = new NodeCache();

router.use("/", async (_req, res) => {
	performRequestFunction(res, async () => {
		return await getTemp();
	});
});

export const getTemp = async () => {
	const temp = await fetchTemp();
	return { temp, unit: "degrees celsius" };
};

const fetchTemp = async () => {
	try {
		let url =
			"https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/22.14/lat/65.58/data.json";
		var data = cache.get(url);
		if (!data) {
			const res = await axios.get(url);
			if (res.status == 200) {
				data = res.data.timeSeries[0].parameters[11].values[0];
				cache.set(url, data, 60 /* sec */ * 5 /*min*/);
			} else {
				res.status(500);
				return "Bad request: " + res.status;
			}
		}
		return data;
	} catch (err) {
		console.error(err);
	}
};

export default router;
