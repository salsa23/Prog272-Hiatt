/**
 * @author Chelsa Hiatt
 * @version 1.0.0
 */

var MongoClient = require('mongodb').MongoClient;

var MyMongo = (function() {'use strict';

	var response = null;
	var database = null;
	var url = null;
	var myCollection = null;
	
	// constructor
	function MyMongo() {
		// setup using config file, written in JSON
		// setConfig('config.json');   <<<<<<<<<<<<<<<<<<< TO BE IMPLEMENTED IN THE FUTURE <<<<<<<<<<<<<<<<<<<<<<<<
		
		// if not set, use default
		if(myCollection === null){
			// urls Array values are { 0: localhost mongo shell, 1: Host Only VM mongo shell, 2: MongoLab }
			var urls = ['mongodb://127.0.0.1:27017/test',
				'mongodb://192.168.56.101:27017/test', 
				'mongodb://appUser:password@ds033429.mongolab.com:33429/midterm272'];
	
			url = urls[0];
			myCollection = 'test_insert';
		}
	}
	
	// set constants with a config file  <<<<<<<<<<<<<<<<<<< TO BE IMPLEMENTED IN THE FUTURE <<<<<<<<<<<<<<<<<<<<<<<<
	// function setConfig(configFile) {
	//	urlChoice = configFile.urlChoice;
	//
	//	url = configFile.mongoUrls[urlChoice];
	//	myCollection = "poems";
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

	MyMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			console.log("-- inside getCollection callback");
			var collection = database.collection(myCollection); //<<<<<<<<<<<<<<<<<<<<< SET FROM "myCollection" CONSTANT AT TOP <<<<<<<<<<<<<<

			// Send the collection to the client.
			collection.find().toArray(function(err, theArray) {
				//console.dir(theArray);
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
			var collection = database.collection(myCollection); //<<<<<<<<<<<<<<<<<<<<< SET FROM "myCollection" CONSTANT AT TOP <<<<<<<<<<<<<<

			// Send the collection to the client.
			collection.find().limit(count).toArray(function(err, theArray) {
				//console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};
	
	// Will insert into current collection
	MyMongo.prototype.insertIntoCollection = function(objectToInsert) {
		getDatabase(function getCol(database){
			var collection = database.collection(myCollection);
			collection.insert(objectToInsert, function(err, docs){
				if(err){
					throw err;
				}
				database.close();
				console.log("insert succeeded");
			});
		});
	};
	
	// Will remove current collection
	MyMongo.prototype.removeCollection = function(objectToInsert) {
		getDatabase(function getCol(database){
			var collection = database.collection(myCollection);
		
			collection.remove(function(err) {
				if (err) {
					throw err;
				}
			console.log('Collection' + myCollection + ' was removed');
			database.close();
			});
		});
	};
	

	return MyMongo;

})();

exports.myMongo = new MyMongo();
