/**
 * @author Chelsa Hiatt
 * @version 1.0.0
 */

var MongoClient = require('mongodb').MongoClient;
var mongodb = require('mongodb');

var MyMongo = (function() {
	'use strict';

	var response = null;
	var database = null;
	var url = null;
	var myCollection = null;

	// constructor
	function MyMongo() {
		// setup using config file, written in JSON
		// setConfig('config.json'); <<<<<<<<<<<<<<<<<<< TO BE IMPLEMENTED IN
		// THE FUTURE <<<<<<<<<<<<<<<<<<<<<<<<

		// if not set, use default
		if (myCollection === null) {
			// urls Array values are { 0: localhost mongo shell, 1: Host Only VM
			// mongo shell, 2: MongoLab }
			var urls = [ 'mongodb://127.0.0.1:27017/test',
					'mongodb://192.168.56.101:27017/test',
					'mongodb://appUser:password@ds033429.mongolab.com:33429/midterm272' ];

			url = urls[0];
			myCollection = 'Poems';
		}
	}

	// set constants with a config file <<<<<<<<<<<<<<<<<<< TO BE IMPLEMENTED
	// function setConfig(configFile) {
	// urlChoice = configFile.urlChoice;
	//
	// url = configFile.mongoUrls[urlChoice];
	// myCollection = "poems";
	// }

	var getDatabase = function(func) {
		console.log('getDatabase called');
		if (database !== null) {
			console.log('database exists');
			database.open(function(err, database) {
				if (err) {
					throw err;
				}
				func(database);
			});
		} else {
			console.log('Looking for database');
			MongoClient.connect(url, function(err, databaseResult) {
				if (err) {
					throw err;
				}
				database = databaseResult;
				func(database);
			});
		}
	};
	
	// function to get a single object from the database by ID
	var getObjectByID = function(id, callback) {
		console.log("getObjectByID called, find ID: " + id);
		getDatabase(function getCol(database) {
			collection.findOne({ "_id" : mongodb.ObjectID(id) }, function(err, obj) {
				console.log("--inside getObjectByID callback.");
				console.log("Found obj: "+ obj.title);
				callback(obj);
			});
		});
	};
	
	MyMongo.prototype.getDocumentByID = function(id, callback) {
		console.log("getDocumentByID called, finding ID: "+ id);
		getDatabase(function getCol(database) {
			collection.findOne({ "_id" : mongodb.ObjectID(id) }, function(err, obj) {
				console.log("--inside getDocumentByID FindOne callback.");
				console.log("Found obj: "+ obj.title);
				database.close();
				callback(obj);
			});
		});
	};

	// get collection
	MyMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			console.log("-- inside getCollection callback");
			var collection = database.collection(myCollection); 

			// Send the collection to the client.
			collection.find().toArray(function(err, theArray) {
				console.log("-- found a collection, first entry: "+ theArray[0]);
				// console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};

	// returns specific number of records
	MyMongo.prototype.getCollectionCount = function(initResponse, count) {
		console.log("getCollectionCount called");
		response = initResponse;

		getDatabase(function getCol(database) {
			console.log("-- inside getCollectionCount callback");
			var collection = database.collection(myCollection); 

			// Send the collection to the client.
			collection.find().limit(count).toArray(function(err, theArray) {
				// console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};

	// Will insert into current collection
	MyMongo.prototype.insertIntoCollection = function(response, objectToInsert) {
		console.log("SERVER: insertIntoCollection called: "+ objectToInsert);
		getDatabase(function getCol(database) {
			var collection = database.collection(myCollection);
			collection.insert(objectToInsert, function(err, docs) {
				if (err) {
					throw err;
				}
				database.close();
				console.log("insert succeeded: " + docs._id);
				
				response.send(docs);
			});
		});
	};

	// Will remove from current collection by ID
	MyMongo.prototype.removeByID = function(id) {
		console.log("MONGO SERVER: removeByID called with ID: "+ id);
		getDatabase(function getCol(database) {
			var collection = database.collection(myCollection);
			collection.remove({ "_id" : mongodb.ObjectID(id)}, function(err, docs) {
				if (err) {
					throw err;
				}
				database.close();
				console.log("Item removed: " + id);
			});
		});
	};
	
	// updated with Charlie Tuesday -- use for copying format
	MyMongo.prototype.removeFromCollection = function(response, selectedPoemID){
		console.log("MONGO SERVER: removeFromCollection called on poem: "+ selectedPoemID);
		console.log("--parameter passed type: "+typeof selectedPoemID);
		getDatabase(function getCol(database){
			var collection = database.collection(myCollection);
			collection.remove({ "_id" : mongodb.ObjectID(selectedPoemID) }, function(err, docs){
				if (err){
					throw err;
				}
				database.close();
				console.log("Item removed: "+ selectedPoemID);
			});
		});
	};
	

	// Will remove current collection
	MyMongo.prototype.removeCollection = function() {
		getDatabase(function getCol(database) {
			var collection = database.collection(myCollection);

			collection.remove(function(err) {
				if (err) {
					throw err;
				}
				console.log('Collection: ' + myCollection + ' was removed');
				database.close();
			});
		});
	};

	return MyMongo;

})();

exports.myMongo = new MyMongo();
