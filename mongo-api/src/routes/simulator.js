import express from "express";
const router = express.Router();

/**
 *{
 *  date:
 *  price:
 *  avg_consumption:
 *  avg_generation:
 *  wind:
 *  temp:
 *}
 */

export default (dbStore, logger) => {
	router.get("/", async (req, res) => {
		try {
			res.json("ok");
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	router.get("/history", async (req, res) => {
		try {
			const history = await getSimulatorHistory(dbStore);
			res.json(history);
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	router.post("/save", async (req, res) => {
		try {
			const body = req.body;
			logger.info({ body });
			const { date, price, wind, temp, avg_generation, avg_consumption } = req.body;
			if (!date) throw { description: "date not provided.", statusCode: 400 };
			if (price == null) throw { description: "price not provided", statusCode: 400 };
			if (wind == null) throw { description: "wind not provided", statusCode: 400 };
			if (temp == null) throw { description: "temp not provided", statusCode: 400 };
			if (avg_consumption == null)
				throw { description: "avg_consumption not provided", statusCode: 400 };
			if (avg_generation == null)
				throw { description: "avg_generation not provided", statusCode: 400 };
			const result = await saveSimulatorData(dbStore, body);
			res.json(result);
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	return router;
};

const saveSimulatorData = async (dbStore, data) => {
	const database = dbStore.db("m7011e");
	const collection = database.collection("simulator");
	const result = await collection.insertOne(data);
	return result;
};

const getSimulatorHistory = async (dbStore) => {
	const database = dbStore.db("m7011e");
	const collection = database.collection("simulator");
	const query = {};
	const result = await collection.find(query).toArray();
	return result;
};
