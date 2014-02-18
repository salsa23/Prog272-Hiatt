/**
 * @author Chelsa Hiatt
 * server file to process Markdown files using modular and routing techniques.
 */

var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;
var fs = require('fs');
var processFile = require('./Library/CreateJson');

app.use(express.bodyParser());   // used with app.post (Built in Express tool)

var port = process.env.PORT || 30025;



//Mongo Query and implement modular pattern
var QueryMongo = (function() {

	var url01 = 'mongodb://127.0.0.1:27017/test';
	var url02 = 'mongodb://192.168.2.19:27017/test';
	var url03 = 'mongodb://192.168.56.101:27017/test';

	// constructor
	function QueryMongo() {
		console.log("QueryMongo constructor called");
	}

	QueryMongo.prototype.getData = function(result) {
		console.log('Called QueryMongo.getData');
		
		// Open the test database that comes with MongoDb
		MongoClient.connect(url01, function(err, database) {
			if (err) {
				throw err;
			}
			console.log('In QueryMongo.getDataCallback');
			getCollection(database, result);
		});

	};
	
	var getCollection = function(database, response) {
		var collection = database.collection('test_docs');

		// Count documents in the collection
		collection.count(function(err, count) {
			console.log(format("Mongo collection count = %s", count));
		});

		// Send the collection to the requester / client.
		collection.find().toArray(function(err, theArray) {
			console.dir(theArray);			// <<<<<<<<<<<<<<<<<<<<<< COMMENT OUT AFTER TESTING <<<<<<<<<<<<<<<<<<<<<<<<<<<<
			database.close();
			response.send(theArray);			
		});
	};

	return QueryMongo;

})();

// Express Code

// route the read call to the Mongo Database (from $get or $JSON)
// parameters are passed in the request.query 
app.get('/read', function(request, response) {
	console.log('Server /read called');
	//var q = new QueryMongo();
	//var data = q.getData(response);	
	//response.send(data);	
	var result = processFile.fileProcess.getFile(response);
	response.send({ "result": result });
});

// To handle a post, we have to add express.bodyParser, shown above.
// parameters come in on request.body, POST used to pass large data such as documents
app.post('/getDocumentPost', function(request, response) {
	console.log('mongoQuery POST /getDocumentPost called');	
	console.log(request.body);
	var userDoc = request.body.userChoice;
	
	var q = new QueryMongo();
	var data = q.getData(response);
	response.send(data);
	
	//var userRadius = parseInt(request.body.userRadius);
	//var result = calculator.myCalc.getCircumference(userRadius);
	//response.send({ "result": result });
});


// upload document - calls CreateJson.js routine
app.get('/uploadDocument', function(request,response){
	console.log('CreateJson /uploadDocument on server called');
		console.log(request.query);	
		var result = processFile.fileProcess.uploadFile(response);
		response.send({ "result": result });
	});


// default app.get for default html page
app.get('/', function(request, response) {
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	response.writeHeader(200, {"Content-Type": "text/html"});   
	response.write(html);
	response.end();
});

//Give express access to the Public directory
app.use("/", express.static(__dirname + '/Public'));

//set up port to listen on
app.listen(port);
console.log('Listening on port :' + port);