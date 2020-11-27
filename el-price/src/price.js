import axios from "axios";

const localhost = process.env.NODE_ENV === "production" ? false : true;
const url = "http://" + (localhost ? "localhost:4000" : "api");

export default async () => {
	const promises = [getWind(), getConsumption()];
	const [avg_wind, avg_consumption] = await Promise.all(promises);
	const avg_generation = windGenerateEffect(avg_wind) / 1000; /*kW*/
	const price = calculatePrice(avg_generation, avg_consumption);
	return { price, avg_consumption, avg_generation };
};

export const calculatePrice = (generation, consumption) => {
	const consumptionRelation = consumption === 0 ? 0 : (consumption - generation) / consumption;
	const price = Math.pow(1.1, 1.4 * consumptionRelation) - 0.5;
	return Number.parseFloat(price.toFixed(2));
};

export const windGenerateEffect = (wind) => {
	// https://www.jamtkraft.se/om-jamtkraft/var-fornybara-produktion/vindkraft/hur-fungerar-vindkraft/
	// Vindkraftverk fungerar från 4 till 25 m/s. Linjär 100W per sekundmeter upp till och med 14 sekundmeter.
	if (wind < 4 || wind > 25) return 0;
	wind = wind > 14 ? 14 : wind;
	const effect = wind * 100;
	return Math.round(effect);
};

const getWind = async () => {
	try {
		const response = await axios.get(url + "/wind");
		const wind = response.data;
		return wind;
	} catch (error) {
		console.error(error);
	}
};

const getConsumption = async () => {
	try {
		const response = await axios.get(url + "/consumption");
		const wind = response.data;
		return wind;
	} catch (error) {
		console.error(error);
	}
};
