import mongodb from "mongodb";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();

const host = process.env.NODE_ENV === "production" ? "mongo" : "localhost";
const port = process.env.MONGO_PORT || 27017;
const uri = `mongodb://${process.env.CONFIG_MONGODB_ROOT_USERNAME}:${process.env.CONFIG_MONGODB_ROOT_PASSWORD}@${host}:${port}/?poolSize=20&w=majority`;

export default () => {
	const mongoClient = new mongodb.MongoClient(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});

	mongoClient.connectStore = async () => {
		await mongoClient.connect();
		await mongoClient.db("m7011e").command({ ping: 1 });
	};

	return mongoClient;
};

export const getIdObject = (id) => {
	return mongodb.ObjectId(id);
};

export const userWithPassword = async (dbStore, email, password) => {
	const database = dbStore.db("m7011e");
	const collection = database.collection("users");
	const query = { email };
	const options = {
		projection: { _id: 1, email: 1, password: 1 },
	};
	const result = await collection.findOne(query, options);
	if (!result) return null;
	if (!(await bcrypt.compare(password, result.password))) return null;
	return { _id: result._id, email: result.email };
};

export const registerUser = async (dbStore, email, username, password) => {
	const database = dbStore.db("m7011e");
	const collection = database.collection("users");
	const doc = { email, username, password };
	const result = collection.insertOne(doc);
	return result;
};
