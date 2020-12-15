import * as Minio from "minio";

const production = process.env.NODE_ENV === "production" ? true : false;
const minioClient = new Minio.Client({
	endPoint: production ? "minio" : "localhost",
	port: 9000,
	useSSL: false,
	accessKey: process.env.MINIO_ACCESS_KEY || "minio",
	secretKey: process.env.MINIO_SECRET_KEY || "minio123",
});

export const uploadImageToMinio = async (id, image) => {
	if (!(await minioClient.bucketExists("images"))) {
		minioClient.makeBucket("images");
	}

	await minioClient.fPutObject("images", `${id}.png`, image);
	return `/users/${id}/get_image`;
};

export const getImageUrlFromMinio = async (id) => {
	await minioClient.fGetObject("images", `${id}.png`, `/uploads/${id}.png`);
	return `/uploads/${id}.png`;
};
