/**
 * @author Chelsa Hiatt
 *
 */

//var request = require('request');
var serverURL = "http://localhost:30025";

describe("Testing MidtermWeb-Hiatt Client Suite", function() {'use strict';
	var testMongo = new MongoData();

	/* beforeEach(function(done) {
		setTimeout(function() {
			value = 15000;
			done();
		}, 15000);
	}); */

	it("Tests that displayRecordID is called with all parameters", function() {
		// peek at call
		spyOn($, "getJSON");
		var request = {};
		request.selectedPoemID = 1;
		testMongo.displayRecordID(request.selectedPoemID);
		expect($.getJSON).toHaveBeenCalledWith('/displayRecordID', request, jasmine.any(Function));
	});

	/* it("SpyOn Callback callback is called and creates fake get method", function(done) {
		// Create a fake "get". Don't call real jquery.get, call this one.
		spyOn($, "get").and.callFake(function(options, callbackReference) {
			callbackReference();
			// This is the Jasmine spy callback
			expect(callback).toHaveBeenCalled();
			// Was the spy called?
			done();
		});
		var callback = jasmine.createSpy();
		$.get('/removeRecordID', request, callback);
	}); */

	it("Integration test for insertPoem, returns the array that was inserted, first position should not be null", function(done) {
		//var poem = {"title": "", "keywords": "test", "author":"tester", "content": "this is a test" };
		//$.getJSON('/insertRecord', function(data) {
		testMongo.queryAll(function(data) {
			// expect(data[0].title).toEqual("a road");
			done();
		});
	});

});
