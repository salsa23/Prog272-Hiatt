/**
 * @author Salsa
 */

describe("Converter test", function() {'use strict';

	it("myConverter object is not null", function() {
		var n = new myConverter();
		expect(n).not.toBeUndefined();
	});

	it("myConverter object degrees var to contain something", function() {
		var n = new myConverter();
		var that = this;
		expect(that.degrees).not.toBeUndefined();
	});
});
