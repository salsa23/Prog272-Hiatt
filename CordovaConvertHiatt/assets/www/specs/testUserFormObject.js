/**
 * @author Salsa
 */

describe("Convert User Form constructor", function() {'use strict';

	it("UserForm object Farenheit to contain something", function() {
		expect(userForm.degree).not.toBeUndefined();
	});

	it("UserForm object Miles to contain something", function() {
		expect(userForm.miles).not.toBeUndefined();
	});

	it("UserForm object Number to contain something", function() {
		expect(userForm.number).not.toBeUndefined();
	});
});

describe("Test convert methods", function() {'use strict';

	it("Check celcius of 32 F conversion method", function() {
		userForm.degree = 32;
		expect(userForm.celcius).toBe(0);
	});

	it("Check 1 mile close to 1.609346 kilometers", function() {
		userForm.distance = 1;
		expect(userForm.kilometers).toBeCloseTo(1.609347);
	});
	
	it("Check sqroot of 4 is 2", function() {
		userForm.number = 4;
		expect(userForm.sqr).toBe(2);
	});
});

