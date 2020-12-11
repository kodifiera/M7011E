import { windGenerateEffect, calculatePrice } from "./price";

describe("[price]", () => {
	test("[price] Price returns correct value", () => {
		//calculatePrice(generation, consumption)
		expect(calculatePrice(0, 1)).toEqual(0.64);
		expect(calculatePrice(0.5, 1)).toEqual(0.57);
		expect(calculatePrice(1, 1)).toEqual(0.5);
		expect(calculatePrice(2, 1)).toEqual(0.38);
	});

	test("[price] Wind generates the correct effect", () => {
		expect(windGenerateEffect(3.9)).toEqual(0);
		expect(windGenerateEffect(4)).toEqual(400);
		expect(windGenerateEffect(4.0)).toEqual(400);
		expect(windGenerateEffect(4.1)).toEqual(410);
		expect(windGenerateEffect(14)).toEqual(1400);
		expect(windGenerateEffect(15)).toEqual(1400);
		expect(windGenerateEffect(25)).toEqual(1400);
		expect(windGenerateEffect(25.1)).toEqual(0);
		expect(windGenerateEffect(26)).toEqual(0);
	});
});
