import express from "express";
import { performRequestFunction } from "./index.js";
import { getWind } from "./wind.js";
import { getTemp } from "./temp.js";
import { getElConsumption } from "./el-consumption.js";
import { getElPrice, windGenerateEffect } from "./el-price.js";
const router = express.Router();

router.use("/", async (req, res) => {
	performRequestFunction(res, async () => {
		const avg_wind = await getWind();
		const avg_temp = await getTemp();
		const avg_consumption = await getElConsumption();
		const price = await getElPrice();
		const avg_generation = windGenerateEffect(avg_wind.wind);
		return {
			avg_wind,
			avg_temp,
			avg_consumption,
			price,
			avg_generation: { el_generation: avg_generation, unit: "kW" },
		};
	});
});

export default router;
