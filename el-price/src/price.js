import axios from "axios";

const localhost = process.env.NODE_ENV === "production" ? false : true;
const url = "http://" + (localhost ? "localhost:4000" : "api");

/**
 * Makes a request to services to get average wind speed and consumption to
 * calculate electricity price on the market.
 */
export default async () => {
	const promises = [getWind(), getConsumption()];
	const [avg_wind, avg_consumption] = await Promise.all(promises);
	const avg_generation = windGenerateEffect(avg_wind) / 1000; /*kW*/
	const price = calculatePrice(avg_generation, avg_consumption);
	return { price, price_currency: "SEK", avg_consumption, avg_generation };
};

/**
 * Calculate the electricity price based on supply and demand.
 * @param {Number<float>} generation Average generating effect [W]
 * @param {Number<float>} consumption Average consuming effect [W]
 * @returns {Number<float>} The price in SEK
 */

export const calculatePrice = (generation, consumption) => {
	const consumptionRelation = consumption === 0 ? 0 : (consumption - generation) / consumption;
	const price = Math.pow(1.1, 1.4 * consumptionRelation) - 0.5;
	return Number.parseFloat(price.toFixed(2));
};

/**
 * Transform wind speed to effect output in Watt.
 * @param {Number<float>} wind Wind speed in meter/sec.
 * @returns {Number<float>} Effect [W]
 */
export const windGenerateEffect = (wind) => {
	// https://www.jamtkraft.se/om-jamtkraft/var-fornybara-produktion/vindkraft/hur-fungerar-vindkraft/
	// Vindkraftverk fungerar från 4 till 25 m/s. Linjär 100W per sekundmeter upp till och med 14 sekundmeter.
	if (wind < 4 || wind > 25) return 0;
	wind = wind > 14 ? 14 : wind;
	const effect = wind * 100;
	return Math.round(effect);
};

/**
 * Make a HTTP request to wind service to get currrent
 * average wind speed.
 */
const getWind = async () => {
	try {
		const response = await axios.get(url + "/wind");
		const wind = response.data;
		return wind;
	} catch (error) {
		console.error(error);
	}
};

/**
 * Make a HTTP request to consumption service to get currrent
 * average electricity consumption.
 */
const getConsumption = async () => {
	try {
		const response = await axios.get(url + "/consumption");
		const wind = response.data;
		return wind;
	} catch (error) {
		console.error(error);
	}
};
