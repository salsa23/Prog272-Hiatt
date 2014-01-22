describe("MilesObject - Jasmine One Suite", function() {

	it("expects 3 miles object to equal 5280 feet", function() {
		expect(milesConvert.milesToFeet()).toBe(15840);
	});

}); 