/**
 * @author Chelsa Hiatt
 */

describe("Hiatt Info Manager Test Suite", function() {'use strict';

	// test that the HTML div value changed
	it("Making sure that the HTML Div01 changed", function() {
		var d = new MyData();
		expect(d).not.toBeUndefined();
	});
	it("testing call to HTML file load returns true", function() {
		var d = new MyData();
		var actual = d.getHtml(1);
		expect(actual).toBeTrue();
	});

	// test Ajax queries load completed
	it('HTMLparagraph01 returned', function() {
		var d = MyData();
		var actual = d.getHtml(1);
		expect(actual).ToEqual(true);
	});

});
