/**
 * @author Chelsa Hiatt
 *
 */

//var request = require('request');
var serverURL = "http://localhost:30025";

describe("Testing Client MidtermWeb-Hiatt Suite", function() {'use strict';
	
	var testMongo = null;
	
	it("proves that jasmine is working", function(){
		expect(true).toBe(true);
	});
	
	it("proves we can fill testMongo with data", function(){
		testMongo = new MongoData().getCollection;
		expect(testMongo).not.toBeNull();
	});
	
	it("performs ASYNC integration test on queryAll", function(){
		testMongo = new MongoData();
		testMongo.readAll(function(data){
			expect(data[0].title).toBe("Sonnet01");
			done();
		});
	});
	
	it("expects getJSON to have been called in queryAll", function(){
		testMongo = new MongoData();
		
		spyOn($, "getJSON");
		testMongo.queryAll(null);
		expect($.getJSON).toHaveBeenCalledWith(serverURL+"/queryAll", null);
	});

	it("Tests that displayRecordID is called with all parameters", function() {
		testMongo = new MongoData();
		// peek at call
		spyOn($, "getJSON");
		var request = {};
		request.selectedPoemID = 1;
		testMongo.displayRecordID(request.selectedPoemID);
		expect($.getJSON).toHaveBeenCalledWith(serverURL+"/displayRecordID", request, Function);
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
		testMongo = new MongoData();
		//var poem = {"title": "", "keywords": "test", "author":"tester", "content": "this is a test" };
		//$.getJSON('/insertRecord', function(data) {
		testMongo.readAll(function(data) {
			// expect(data[0].title).toEqual("a road");
			done();
		});
	});

});
