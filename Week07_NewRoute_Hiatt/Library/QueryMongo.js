/**
 * @author Charlie Calvert
 */

var MongoClient = require('mongodb').MongoClient;

var QueryMongo = (function() {'use strict';
	// global objects within QueryMongo object
	var response = null;
	var database = null;
	var url = null;
	
	function QueryMongo() {
		var urls = ['mongodb://127.0.0.1:27017/test',
			'mongodb://192.168.2.19:27017/test',
			'mongodb://192.168.2.34:27017/test',
			'mongodb://192.168.56.101:27017/test'];

		url = urls[0];
	}

	// parameter as a function so that we can call function after open, then close
	var getDatabase = function(func) {
		console.log('Called getDatabase');
		// checks to see if database exists
		if (database !== null) {
			console.log('database exists');
			database.open(function(err, database) {
				if (err) {
					throw err;
				}
				// runs the function that was passed in
				func(database);
			});
		} else {
			// when its not present, it will create the database
			console.log('database not present, Querying for database');
			MongoClient.connect(url, function(err, databaseResult) {
				if (err) {
					throw err;
				}
				database = databaseResult;
				func(database);
			});
		}
	};

	QueryMongo.prototype.getCollection = function(initResponse) {
		console.log("getCollection called");
		response = initResponse;
		// call getDatabase passing in function of what you want to do
		getDatabase(function getCol(database) {
			var collection = database.collection('test_insert');

			// Send the collection to the client.
			collection.find().toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};
	// passes in count of how many records you want to return for a parameter
	QueryMongo.prototype.getCollectionCount = function(initResponse, count) {
		console.log("getCollection called");
		response = initResponse;
		getDatabase(function getCol(database) {
			var collection = database.collection('test_insert');

			// Send the collection to the client, where you want the limit (count)
			collection.find().limit(count).toArray(function(err, theArray) {
				console.dir(theArray);
				database.close();
				response.send(theArray);
			});
		});
	};
	
	// Will insert into collection
	QueryMongo.prototype.insertIntoCollection = function(objectToInsert) {

		getDatabase(function getCol(database){
			var collection = database.collection('test_insert');
			collection.insert(objectToInsert, function(err, docs){
				if(err){
					throw err;
				}
				database.close();
				console.log("insert succeeded");
			});
		});
	};

	return QueryMongo;

})();


exports.QueryMongo = new QueryMongo();
