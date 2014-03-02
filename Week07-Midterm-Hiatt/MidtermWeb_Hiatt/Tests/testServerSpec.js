/**
 * @author Chelsa Hiatt
 * Test using Jasmine-Node for server routing functionality
 */

var request = require('request');
var serverURL = "http://localhost:30025";

describe("Testing MidtermWeb-Hiatt Server Suite", function() { 'use strict';

	it("Testing that server is ON", function(done) { 
		console.log('Calling testAwake');
		request(serverURL+"/testAwake", function(error, response, body) {
			expect(body).toEqual("I am awake.");
			done();
		});
	});

	it("Test that all documents are queried and returned", function(done) {
		request(serverURL+"/queryAll", function(error, response, body) {
			console.log("Calling ask for all documents - 154 original");
			
			// Convert result from a JSON string to a JSON object
			body = JSON.parse(body);
			
			//console.log(body);			
			expect(body.length).toEqual(154);
			done();
		});
	});
	
	it("Test that all documents are queried after add of one", function(done) {
		
		beforeEach(function(done) {
			var item = { "title": "testPoem", "keywords": "test", "author":"tester", "content": "this is a test" };
			myMongo.addPoem(item, function(error, result) {
				done();
			});
		});
		
		request(serverURL+"/queryAll", function(error, response, body) {
			console.log("Calling ask for all documents - 155 post add");
			
			// Convert result from a JSON string to a JSON object
			body = JSON.parse(body);
			
			//console.log(body);			
			expect(body.length).toEqual(155);
			done();
		});
	});

	it('Tests that 1 document is added to collection', function(done) {
		var item = { 'title': "testPoem", "keywords": "test", "author":"tester", "content": "this is a test" };
		myMongo.addPoem(item, function(error, result) {
			expect(result).toEqual(1);
			done();
		});
	});
	
}); 
