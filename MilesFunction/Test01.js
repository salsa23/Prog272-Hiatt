describe("MilesFunction - Jasmine One Suite", function() {

	it("expects 1 mile to equal 5280 feet", function() {
		expect(milesConvert.milesToFeet(1)).toBe(5280);
	});

	it("expects -1 mile to equal -5280 feet", function() {
		expect(milesConvert.milesToFeet(-1)).toBe(-5280);
	});
}); 