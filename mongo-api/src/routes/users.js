import fs from "fs";
import bcrypt from "bcrypt";
import express from "express";
import multer from "multer";
import { performRequestFunction } from "../index.js";
import { userWithPassword, registerUser } from "../helpers/store.js";
import { generateAccessToken, extractUUID, verifyJWT, storeAccessUUID } from "../helpers/auth.js";
import { uploadImageToMinio, getImageUrlFromMinio } from "../helpers/minio.js";
const router = express.Router();

const upload = multer({
	limits: { files: 1, fieldSize: 5 * 1024 * 1024 /* 5MB */ },
	fileFilter: (_req, file, cb) => {
		if (
			file.originalname.match(/\.(jpg|jpeg|png|gif)$/i) &&
			file.mimetype.match(/^image\/(jpg|jpeg|png|gif)$/i)
		) {
			return cb(null, true);
		}
		return cb(new Error("Only image are allowed."), false);
	},
	storage: multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, "/uploads");
		},
		filename: (req, _file, cb) => {
			const id = req.params.id;
			cb(null, id + ".png");
		},
	}),
});

export default (dbStore) => {
	router.get("/", async (_req, res) => {
		await performRequestFunction(res, () => {
			return "ok";
		});
	});

	router.post("/register", async (req, res) => {
		await performRequestFunction(res, async () => {
			const { email, password } = req.body;
			if (!email) throw { description: "email not provided", statusCode: 400 };
			if (!password) throw { description: "password not provided", statusCode: 400 };
			const hashedPassword = await bcrypt.hash(password, 10);
			return await registerUser(dbStore, email, email, hashedPassword);
		});
	});

	router.post("/login", async (req, res) => {
		await performRequestFunction(res, async () => {
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
			return { access_token: jwt, user_id: user._id };
		});
	});

	router.post("/:id/upload_image", upload.single("image"), async (req, res) => {
		await performRequestFunction(res, async () => {
			// TODO: Verify JWT signature and id
			const image = req.file;
			if (!image) throw { description: "No file provided", statusCode: 400 };
			return await uploadImageToMinio(req.params.id, image.path);
		});
	});

	router.get("/:id/get_image", async (req, res) => {
		const result = await performRequestFunction(
			res,
			async () => {
				const filePath = "/uploads/" + req.params.id + ".png";
				if (fs.existsSync(filePath)) return filePath;
				return await getImageUrlFromMinio(req.params.id);
			},
			false,
		);
		res.sendFile(result);
	});

	router.get("/verify_auth_token", async (req, res) => {
		await performRequestFunction(res, async () => {
			const jwt = req.headers.authorization;
			return await verifyJWT(jwt, dbStore);
		});
	});

	return router;
};
