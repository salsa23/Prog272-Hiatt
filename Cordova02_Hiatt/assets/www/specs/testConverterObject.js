/**
 * @author Salsa
 */

describe("Converter test", function() {'use strict';

	it("myConverter object is not null", function() {
		var n = new myConverter();
		expect(n).not.toBeUndefined();
	});

	it("myConverter with 32 degrees to be 0", function() {
		var n = new myConverter();
		var actual = n.degreeConvert(32);
		expect(actual).toBe(0);
	});
});
