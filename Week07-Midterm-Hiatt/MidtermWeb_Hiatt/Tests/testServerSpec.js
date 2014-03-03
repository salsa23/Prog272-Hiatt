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

	it("gets the total number of documents in the collection", function(done) {
		request(serverURL+"/getDocumentCount", function(error, response, body) {
			console.log("calling get Doc Count");
			body = JSON.parse(body);
			expect(body.documentCount).toEqual(154);
			done();
		});
	});

	it("Test that all documents are queried and returned", function(done) {
		request(serverURL+"/queryAll", function(error, response, body) {
			console.log("Calling ask for all documents - 154 original poems");
			
			// Convert result from a JSON string to a JSON object
			body = JSON.parse(body);
			
			//console.log(body);			
			expect(body.length).toEqual(154);
			done();
		});
	});
}); 
