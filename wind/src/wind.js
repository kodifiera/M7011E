import NodeCache from "node-cache";
const cache = new NodeCache();

/**
 * Return a gaussian distribution function with mean value and a standard deviation.
 * JavaScript implementation by Alessandro Jacopson of Donald Knuths Algoritm P in his book The Art of Computer Programming. Found on Stack Overflow.
 * @see https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
 * @param {*} mean
 * @param {*} stddev
 */
const gaussian = (mean, stddev) => {
	return () => {
		var V1;
		var V2;
		var S;
		do {
			var U1 = Math.random();
			var U2 = Math.random();
			V1 = 2 * U1 - 1;
			V2 = 2 * U2 - 1;
			S = V1 * V1 + V2 * V2;
		} while (S >= 1);
		if (S === 0) return 0;
		return mean + stddev * (V1 * Math.sqrt((-2 * Math.log(S)) / S));
	};
};

/**
 * Get the current wind speed from a gaussian (normal) distribution which
 * in return is generated from a gaussian distribution.
 */
export default () => {
	// See if there is a daily average in cache (saved for 24 hours)
	let dayAvg = cache.get("dayAvg");
	if (!dayAvg) {
		const yearDist = gaussian(6, 2);
		dayAvg = yearDist();
		// Save the daily average wind speed to the cache. Flush after 24 hours.
		cache.set("dayAvg", dayAvg, 24 /*hours*/ * 60 /*min*/ * 60 /*sec*/);
	}
	const dayDist = gaussian(dayAvg, dayAvg / 5);
	const current = dayDist();
	return Math.abs(current);
};
