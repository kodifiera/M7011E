import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { getIdObject } from "./store.js";

const secret = process.env.JWT_SECRET || "This is very secret";

export const generateAccessToken = (user) => {
	const uuid_token = uuidv4();
	const token = jwt.sign({ user, uuid_token }, secret);
	return token;
};

export const extractUUID = (token) => {
	const decoded = jwt.decode(token);
	return decoded.uuid_token;
};

export const verifyJWT = async (token, dbStore) => {
	const verify = jwt.verify(token, secret, (error, res) => {
		if (error) throw error;
		return res;
	});
	const database = dbStore.db("m7011e");
	const collection = database.collection("access_tokens");
	const query = {
		access_token: verify.access_token,
		user_id: getIdObject(verify.user._id),
	};
	const result = await collection.find(query).toArray();
	if (!result) throw { description: "Could not verify access token", statusCode: 400 };
	return true;
};

export const storeAccessUUID = async (dbStore, accessToken, userId) => {
	const database = dbStore.db("m7011e");
	const collection = database.collection("access_tokens");
	const doc = { access_token: accessToken, user_id: userId };
	const result = collection.insertOne(doc);
	return result;
};
