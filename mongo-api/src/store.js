import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const host = process.env.NODE_ENV === "production" ? "mongo" : "localhost";
const port = process.env.PORT || 27017;
const uri = `mongodb://${process.env.CONFIG_MONGODB_ROOT_USERNAME}:${process.env.CONFIG_MONGODB_ROOT_PASSWORD}@${host}:${port}/?poolSize=20&w=majority`;

export default new mongodb.MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

export const connect = async (mongoClient) => {
	try {
		await mongoClient.connect();
		console.info("Database client established");
		await mongoClient.db("m7011e").command({ ping: 1 });
		console.info("Database connected");
	} catch (error) {
		console.error(error);
		mongoClient.close();
		return;
	}
};
