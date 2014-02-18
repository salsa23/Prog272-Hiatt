var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var url01 = 'mongodb://127.0.0.1:27017/test';
var url02 = 'mongodb://192.168.2.19:27017/test';

MongoClient.connect(url01, function(err, db) {
	'use strict';
	if (err) {
		throw err;
	}

	var collection = db.collection('test_data');

	// array to hold collection objects to insert
	var dataArray = [];

	// populate the array with document details
	var docName = "enter doc name here";
	var docText = "markdown text goes here";
	var documentUpload = {
		docName : docName,
		docText : docText,
		docDate : docDate
	};
	// add the document to the array
	dataArray.push(documentUpload);

	// insert array into collection
	collection.insert(dataArray, function(err, docs) {
		collection.count(function(err, count) {
			console.log(format("count = %s", count));
		});

		// Locate all the entries using find
		collection.find().toArray(function(err, results) {
			console.dir(results);

			// close the db
			db.close();
		});
	});
});