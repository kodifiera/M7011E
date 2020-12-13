import bcrypt from "bcrypt";
import express from "express";
import multer from "multer";
import * as Minio from "minio";
import { generateAccessToken, extractUUID, verifyJWT, storeAccessUUID } from "./auth.js";
const router = express.Router();

const upload = multer({
	dest: "/uploads",
	limits: { files: 1, fieldSize: 5 * 1024 * 1024 /* 5MB */ },
	fileFilter: (req, file, cb) => {
		if (
			file.originalname.match(/\.(jpg|jpeg|png|gif)$/i) &&
			file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/i)
		) {
			return cb(null, true);
		}
		return cb(new Error("Only image are allowed."), false);
	},
});

export default (dbStore, logger) => {
	router.get("/", async (req, res) => {
		try {
			res.json("ok");
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	router.post("/register", async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email) throw { description: "email not provided", statusCode: 400 };
			if (!password) throw { description: "password not provided", statusCode: 400 };
			const hashedPassword = await bcrypt.hash(password, 10);
			const register = await registerUser(dbStore, email, email, hashedPassword);
			res.json(register);
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	router.post("/login", async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email) throw { description: "email not provided.", statusCode: 400 };
			if (!password) throw { description: "password not provided", statusCode: 400 };
			const user = await userWithPassword(dbStore, email, password);
			if (!user)
				throw {
					description: "User with email and password could not be found",
					statusCode: 400,
				};
			// Generate JWT access token.
			const jwt = generateAccessToken(user);
			// Save access token unique identifier in database.
			const uuidToken = extractUUID(jwt);
			const successfullyStored = storeAccessUUID(dbStore, uuidToken, user._id);
			if (!successfullyStored)
				throw {
					description: "Something went wrong when storing uuid_token",
					statusCode: 500,
				};
			// Upon success, return JWT as access token
			res.json({ access_token: jwt, user_id: user._id });
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	router.post("/:id/upload_image", upload.single("image"), async (req, res) => {
		try {
			const image = req.file;
			if (!image) throw { description: "No file provided", statusCode: 400 };
			//TODO: Verify filetype
			await uploadImageToMinio(req.params.id, image.path);
			res.json(200);
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	router.get("/verify_auth_token", async (req, res) => {
		try {
			const jwt = req.headers.authorization;
			const verified = await verifyJWT(jwt, dbStore);
			res.json(verified);
		} catch (error) {
			logger.error(error);
			res.status(error.statusCode || 500).json({ error });
		}
	});

	return router;
};

const userWithPassword = async (dbStore, email, password) => {
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

const registerUser = async (dbStore, email, username, password) => {
	const database = dbStore.db("m7011e");
	const collection = database.collection("users");
	const doc = { email, username, password };
	const result = collection.insertOne(doc);
	return result;
};

const uploadImageToMinio = async (id, image) => {
	const minioClient = new Minio.Client({
		endPoint: "localhost",
		port: 4006,
		useSSL: false,
		accessKey: "minio",
		secretKey: "minio123",
	});

	if (!(await minioClient.bucketExists("images"))) {
		minioClient.makeBucket("images");
	}

	const etag = await minioClient.fPutObject("images", `${id}.png`, image);
	return etag;
};
