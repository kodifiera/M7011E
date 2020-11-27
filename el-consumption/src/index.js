const express = require("express");
const axios = require("axios");
const app = express();

const PORT = process.env.PORT || 8080;
const localhost = process.env.NODE_ENV === "production" ? false : true;
const url = "http://" + (localhost ? "localhost:4000" : "api");
app.listen(PORT, () => console.info(`Server started on port ${PORT}`));

app.get("/", async (req, res) => {
	const consum = await degreeConsumption();
	res.send("" + consum);
});

const getTemp = async () => {
	try {
		const res = await axios.get(url + "/temp");
		if (res.status == 200) {
			return res.data;
		} else {
			res.status(500);
			return "Bad request: " + res.status;
		}
	} catch (err) {
		console.error(err);
	}
};

const heatingConsumption = () => {
	var date = new Date();
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

const degreeConsumption = async () => {
	const temp = await getTemp();

	const wattPerDegree = 0.085; // 15kWh / 365 / 24 = 1.7, 5 percent per delta degree => 0.05*1.7 = 0.085
	const zeroConsumtion = 25;
	var consumtion = 0;
	if (temp < zeroConsumtion) {
		consumtion = wattPerDegree * (zeroConsumtion - temp);
	}
	const heatingCon = heatingConsumption();
	consumtion += heatingCon;
	return consumtion;
};
