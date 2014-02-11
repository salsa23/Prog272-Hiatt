var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');

// Access Express and implement modular pattern
var QueryMongo = (function() {

	var url01 = 'mongodb://127.0.0.1:27017/test';
	var url02 = 'mongodb://192.168.2.19:27017/test';
	var url03 = 'mongodb://192.168.56.101:27017/test';

	function QueryMongo() {

	}

	QueryMongo.prototype.getDataHiatt = function(result) {
		console.log('Called getDataHiatt');

		// Open the test database that comes with MongoDb
		MongoClient.connect(url01, function(err, database) {
			if (err) {
				throw err;
			}
			console.log('IngetDataCallback');
			getCollection(database, result);
		});

	};

	var getCollection = function(database, response) {

		var collection = database.collection('test_data_hiatt');

		// Count documents in the collection
		collection.count(function(err, count) {
			console.log(format("count = %s", count));
		});

		// Send the collection to the client.
		collection.find().toArray(function(err, theArray) {
			console.dir(theArray);
			database.close();
			response.send(theArray);			
		});

	};

	// Will create collection if it does not exist
	var insertIntoCollection = function(db, collectionName, objectToInsert) {

		var collection = db.collection(collectionName);
		collection.insert(objectToInsert, function(err, docs) {
			getCollection(db);
		});
	};
	
	return QueryMongo;

})();

// Express Code
app.get('/read', function(request, response) {
	var q = new QueryMongo();
	var data = q.getDataHiatt(response);	
});

// Default.
app.get('/', function(request, result){
  	var html = fs.readFileSync(__dirname + '/Public/index.html');
	result.writeHeader(200, {"Content-Type": "text/html"});   
	result.write(html);
	result.end();
});

// Give express access to the Public directory
app.use("/", express.static(__dirname + '/Public'));

// Tell the webserver (and user) to listen on port 30025
app.listen(30025);
console.log('Listening on port 30025');