/**
 * Running service worker for storing simulator data in mongodb by calling "http://mongo-api/simulator/save"
 */
import axios from "axios";
import externalRequests from "./externalRequests.js";

export default (isLocalhost) => {
	let interval;
	return {
		start(minutes) {
			console.info("Simulator API service worker started");
			interval = setInterval(() => {
				storeInDatabase(isLocalhost);
			}, minutes * 1000 * 60);
		},

		stop() {
			clearInterval(interval);
			console.info("Simulator API service worker stopped");
		},
	};
};

const storeInDatabase = async (isLocalhost) => {
	try {
		const url = "http://" + (isLocalhost ? "localhost:8080" : "mongo-api") + "/simulator/save";
		let data = await externalRequests();
		data.date = new Date();
		const response = await axios.post(url, data);
		console.info({ response });
	} catch (error) {
		console.error(error);
	}
};
