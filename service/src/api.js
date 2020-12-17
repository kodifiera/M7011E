import express from "express";
const router = express.Router();
export default () => {
	router.get("/", async (_req, res) => {
		res.send("ok");
	});

	return router;
};
