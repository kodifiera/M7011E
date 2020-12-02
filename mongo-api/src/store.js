import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.NODE_ENV === "production" ? "mongo" : "localhost";
const port = process.env.PORT || 27017;
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
