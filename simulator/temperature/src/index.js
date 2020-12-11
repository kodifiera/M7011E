var express = require("express");
var axios = require("axios");
const app = express();
const LRU = require("lru-cache");
const PORT = process.env.PORT || 3000;
const cache = new LRU({ maxAge: 600000 });

app.listen(PORT, () => console.info(`Server started on port ${PORT}`));

app.get("/", async (req, res) => {
	const temp = await getTemp();
	res.send("" + temp);
});

const getTemp = async () => {
	try {
		let url =
			"https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/22.14/lat/65.58/data.json";
		var data = cache.get(url);
		if (!data) {
			const res = await axios.get(url);
			if (res.status == 200) {
				data = res.data.timeSeries[0].parameters[11].values[0];
				cache.set(url, data);
			} else {
				res.status(500);
				return "Bad request: " + res.status;
			}
		}
		return data;
	} catch (err) {
		console.error(err);
	}
};
