import axios from "axios";

const localhost = process.env.NODE_ENV === "production" ? false : true;

export const getTemp = async () => {
	const url = "http://" + (localhost ? "localhost:4002" : "temperature");
	const response = await axios.get(url);
	return response.data;
};

export const getWind = async () => {
	const url = "http://" + (localhost ? "localhost:4003" : "wind");
	const response = await axios.get(url);
	return response.data;
};

export const getConsumption = async () => {
	const url = "http://" + (localhost ? "localhost:4004" : "el-consumption");
	const response = await axios.get(url);
	return response.data;
};

export const getPrice = async () => {
	const url = "http://" + (localhost ? "localhost:4005" : "el-price");
	const response = await axios.get(url);
	return response.data;
};

export default async () => {
	const price = await getPrice();
	const wind = await getWind();
	const temp = await getTemp();
	return {
		price: price.price,
		wind,
		temp,
		avg_consumption: price.avg_consumption,
		avg_generation: price.avg_generation,
	};
};
