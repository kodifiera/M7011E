import express from "express";
import dotenv from "dotenv";
import mongodb from "mongodb";
dotenv.config();

const uri = `mongodb://${process.env.CONFIG_MONGODB_ROOT_USERNAME}:${process.env.CONFIG_MONGODB_ROOT_PASSWORD}@mongo:27017/?poolSize=20&w=majority`;
const MongoClient = mongodb.MongoClient;
const mongoClient = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const app = express();
const port = 8080;

app.get("/", async (req, res) => {
	try {
		const database = mongoClient.db("db");
		const collection = database.collection("documents");
		const query = { name: "Red" };
		const options = {
			projection: { _id: 0, name: 1, town: 1 },
		};
		const result = await collection.find(query, options).toArray();
		res.status(200);
		res.send(result);
	} catch (error) {
		console.error(error);
		res.status(500);
		res.send(error);
	}
});

app.get("/add", async (req, res) => {
	try {
		const database = mongoClient.db("db");
		const collection = database.collection("documents");
		const doc = { name: "Red", town: "kanto" };
		const result = await collection.insertOne(doc);
		res.status(200);
		res.send(result);
	} catch (error) {
		console.error(error);
		res.status(500);
		res.send(error);
	}
});

app.listen(port, async () => {
	console.info(`Example app listening at http://localhost:${port}`);
	try {
		await mongoClient.connect();
		console.info("Database client established");
		await mongoClient.db("test").command({ ping: 1 });
		console.info("Database connected");
	} catch (error) {
		console.error(error);
		mongoClient.close();
		return;
	}
});
