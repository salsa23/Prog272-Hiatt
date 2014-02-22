/**
 * @author Chelsa Hiatt
 * @version 1.0.0
 * @classDescription This is a Mongo Database Utility File. 
 * Be sure to update the constant variables url01-url03, 'myCollection', and any code you wish 
 * to execute located at the end of this file.
 */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');

var MyMongo = (function() {'use strict';
	// url values are 1: localhost mongo shell, 2: Host Only VM mongo shell, 3: MongoLab
	var url01 = 'mongodb://127.0.0.1:27017/test';
	var url02 = 'mongodb://192.168.56.101:27017/test';
	var url03 = 'mongodb://appUser:password@ds033429.mongolab.com:33429/midterm272';
	var myCollection = "test_insert";

	// constructor
	function MyMongo() {

	}

	// method to getData from Mongo
	MyMongo.prototype.getData = function(option) {
		console.log('getData called');

		// Open the database and perform option: insert, remove or getdb
		MongoClient.connect(url03, function(err, database) {
			if (err) {
				throw err;
			}
			console.log('--inside getData callback, prior to option selection');
			if (option === 'insert') {
				// get array from JSON object
				var dataToInsert = [];
				
				insertCollection(database, dataToInsert);
				
			} else if (option === 'remove') {
				removeCollection(database);
			} else {
				getCollection(database);
			}
		});

	};
	// inserts a single record into the database - sub routine of insertCollection that can also be used separately
	var insertData = function(newRecord) {
		
		collection.insert(newRecord, function(err, docs) {
			if (err) {
				throw err;
			} else {
				console.log("New Record Added: "+ newRecord);
			}
		});
	};

	// creates a new collection from an array
	var insertCollection = function(database, dataToInsert) {
		console.log('insertCollection called');
		var collection = database.collection(myCollection);
		
		for (var i = 0; i < dataToInsert.length; i=i+1) {
			var newRecord = {
				"title" : dataToInsert[i].title,
				"author": dataToInsert[i].author,
				"keywords": dataToInsert[i].keywords,
				"content": dataToInsert[i].content
			};
			insertData(newRecord);
			console.log("New Record Added from Array: "+ newRecord);
		}
		getCollection(database);
	};

	// retrieves the collection for the client interface to use
	var getCollection = function(database) {
		console.log('getCollection called');
		var collection = database.collection(myCollection);

		// Send the collection to the client.
		collection.find().toArray(function(err, theArray) {
			console.log('--inside getCollection callback - begin array send to client');
			//console.dir(theArray);
			database.close();
		});
	};

	// will delete/remove the current collection from the database - used in refreshing data by first clearing database before re-populating
	var removeCollection = function(database) {
		console.log('removeCollection called');
		var collection = database.collection(myCollection);
		
		collection.remove(function(err) {
			if (err) {
				throw err;
			}
			console.log('Collection' + myCollection + ' was removed');
			database.close();
		});
	};

	return MyMongo;

})();

var db = new MyMongo();
// Prior to executing this file, un-comment which functional code you wish to run
// db.getData('insert');
// db.getData('remove');
// db.getData('getdb');
