/**
 * @author Chelsa Hiatt
 */

describe("Converter test", function() {'use strict';

	// testing object creation
	it("myConverter object is not undefined", function() {
		var n = new myConverter();
		expect(n).not.toBeUndefined();
	});
	
	// testing degrees fahrenheit to celcius
	it("myConverter with 86 degrees F to be 30 C", function() {
		var n = new myConverter();
		var actual = n.degreeConvert(86);
		expect(actual).toBeCloseTo(30);
	});
	it("myConverter with 32 degrees F to be 0 C", function() {
		var n = new myConverter();
		var actual = n.degreeConvert(32);
		expect(actual).toBe(0);
	});
	it("myConverter with -32 degrees not to be 0", function() {
		var n = new myConverter();
		var actual = n.degreeConvert(-32);
		expect(actual).not.toBe(0);
	});
	
	// testing miles to KM
	it("myConverter with 0 miles to be 0 KM", function() {
		var n = new myConverter();
		var actual = n.milesConvert(0);
		expect(actual).toBe(0);
	});
	it("myConverter with -10 miles to be 0 KM", function() {
		var n = new myConverter();
		var actual = n.milesConvert(-10);
		expect(actual).toBe(0);
	});
	it("myConverter with 0.62137 miles to be 1 KM", function() {
		var n = new myConverter();
		var actual = n.milesConvert(0.62137);
		expect(actual).toBe(1);
	});
	it("myConverter with 6.2137 miles to be 10 KM", function() {
		var n = new myConverter();
		var actual = n.milesConvert(6.2137);
		expect(actual).toBe(10);
	});
	
	// testing number sq root
	it("myConverter with sq root of 4 to be 2", function() {
		var n = new myConverter();
		var actual = n.numberConvert(4);
		expect(actual).toBe(2);
	});
	it("myConverter with sq root of 0 to be 0", function() {
		var n = new myConverter();
		var actual = n.numberConvert(0);
		expect(actual).toBe(0);
	});
	it("myConverter with sq root of -4 to be 2", function() {
		var n = new myConverter();
		var actual = n.numberConvert(-4);
		expect(actual).toBe(2);
	});
});
