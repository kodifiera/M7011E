import bcrypt from "bcrypt";
import express from "express";
const router = express.Router();

export default (dbStore) => {
	router.get("/", async (req, res) => {
		try {
			const result = await listUsers(dbStore);
			res.json(result);
			res.status(200);
		} catch (error) {
			res.send(error);
			res.status(500);
		}
	});

	router.post("/register", async (req, res) => {
		try {
			const { email, username, password } = req.body;
			if (!email) throw { description: "email not provided", statusCode: 400 };
			if (!username) throw { description: "username not provided", statusCode: 400 };
			if (!password) throw { description: "password not provided", statusCode: 400 };
			const hashedPassword = await bcrypt.hash(password, 10);
			const register = await registerUser(dbStore, email, username, hashedPassword);
			res.json(register);
			res.status(200);
		} catch (error) {
			res.json({ error });
			res.status(error.statusCode || 500);
		}
	});

	//router.post("/login", (req, res) => {});

	return router;
};

const listUsers = (dbStore) =>
	new Promise((resolve, reject) => {
		try {
			const database = dbStore.db("m7011e");
			const collection = database.collection("users");
			const query = {};
			const options = {
				projection: { _id: 0, username: 1, email: 1, password: 1 },
			};
			const result = collection.find(query, options).toArray();
			resolve(result);
		} catch (error) {
			reject(error);
		}
	});

const registerUser = async (dbStore, email, username, password) =>
	new Promise((resolve, reject) => {
		try {
			const database = dbStore.db("m7011e");
			const collection = database.collection("users");
			const doc = { email, username, password };
			const result = collection.insertOne(doc);
			resolve(result);
		} catch (error) {
			reject({ description: error, statusCode: 500 });
		}
	});
