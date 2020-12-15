import express from "express";
import { performRequestFunction } from "./index.js";
import { getTemp } from "./temp.js";
const router = express.Router();

router.use("/", async (req, res) => {
	performRequestFunction(res, async () => {
		return await getElConsumption();
	});
});

export const getElConsumption = async () => {
	const temp = await getTemp();
	const consumption = await degreeConsumption(temp, new Date());
	return { el_consumption: consumption, unit: "kW" };
};

const heatingConsumption = (date) => {
	var hour = date.getHours();
	var consum = 0;
	//normal distribution of 27kWh per day, distributed in kWh per hour
	if (hour >= 4 && hour < 8) {
		consum = 0.06605;
	}
	if ((hour >= 2 && hour < 4) || (hour >= 8 && hour < 10)) {
		consum = 0.22275;
	}
	if ((hour >= 0 && hour < 2) || (hour >= 10 && hour < 12)) {
		consum = 0.59535;
	}
	if ((hour >= 22 && hour != 0) || (hour >= 12 && hour < 14)) {
		consum = 1.2393;
	}
	if ((hour >= 20 && hour < 22) || (hour >= 14 && hour < 16)) {
		consum = 2.02365;
	}
	if (hour >= 16 && hour < 20) {
		consum = 2.58525;
	}
	return consum;
};

const degreeConsumption = async (temp, date) => {
	const wattPerDegree = 0.085; // 15kWh / 365 / 24 = 1.7, 5 percent per delta degree => 0.05*1.7 = 0.085
	const zeroConsumtion = 25;
	var consumtion = 0;
	if (temp < zeroConsumtion) {
		consumtion = wattPerDegree * (zeroConsumtion - temp);
	}
	const heatingCon = heatingConsumption(date);
	consumtion += heatingCon;
	return consumtion;
};

export default router;
