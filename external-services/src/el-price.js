import express from "express";
import { performRequestFunction } from "./index.js";
import { getWind } from "./wind.js";
import { getElConsumption } from "./el-consumption.js";
const router = express.Router();

router.use("/", async (req, res) => {
	performRequestFunction(res, async () => {
		return await getElPrice();
	});
});

export const getElPrice = async () => {
	const promises = [getWind(), getElConsumption()];
	const [avg_wind, avg_consumption] = await Promise.all(promises);
	const avg_generation = windGenerateEffect(avg_wind.wind);
	const price = calculatePrice(avg_generation, avg_consumption.el_consumption);
	return { price, price_currency: "SEK" };
};

/**
 * Transform wind speed to effect output in Watt.
 * @param {Number<float>} wind Wind speed in meter/sec.
 * @returns {Number<float>} Effect [kW]
 */
export const windGenerateEffect = (wind) => {
	// https://www.jamtkraft.se/om-jamtkraft/var-fornybara-produktion/vindkraft/hur-fungerar-vindkraft/
	// Vindkraftverk fungerar från 4 till 25 m/s. Linjär 100W per sekundmeter upp till och med 14 sekundmeter.
	if (wind < 4 || wind > 25) return 0;
	wind = wind > 14 ? 14 : wind;
	const effect = wind * 100; /*W*/
	return Math.round(effect) / 1000; /*kW*/
};

/**
 * Calculate the electricity price based on supply and demand.
 * @param {Number<float>} generation Average generating effect [W]
 * @param {Number<float>} consumption Average consuming effect [W]
 * @returns {Number<float>} The price in SEK
 */
const calculatePrice = (generation, consumption) => {
	const consumptionRelation = consumption === 0 ? 0 : (consumption - generation) / consumption;
	const price = Math.pow(1.1, 1.4 * consumptionRelation) - 0.5;
	return Number.parseFloat(price.toFixed(2));
};

export default router;
