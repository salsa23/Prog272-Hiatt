/**
 * @author Chelsa Hiatt
 * @version 1.0.0
 */

var express = require('express');
var app = express();
var format = require('util').format;
var fs = require('fs');
var qm = require('./lib/MyMongo');
var myMongo = qm.myMongo;
var ePort = 30025;

console.log('init setup qm:' + qm);
console.log('init setup myMongo:' + myMongo);

// Read the whole collection
app.get('/queryAll', function(request, response) {'use strict';
	console.log('queryAll called');
	console.log('from queryAll --data: '+ myMongo);
	console.log('from queryAll --request: '+ request);
	myMongo.getCollection(response);
});

// displays a specific record
app.get('/displayRecordID', function(request, response) { 'use strict';
	console.log('displayRecordID called');
	console.log('from displayRecordID --request: '+ request);
	console.log('request query: '+request.query);
	console.log('from displayRecordID --requested ID: '+request.selectedPoemID);
	myMongo.getDocumentByID(response, selectedPoemID);
});

// loads from JSON file on server
app.get('/loadCollection', function(request, response) { 'use strict';
	var fileContent = fs.readFileSync('./src/Shakespeare.json','utf8');
	myMongo.insertIntoCollection(response, JSON.parse(fileContent));
});

// removes collection - clears entries
app.get('/removeCollection', function(request, response) { 'use strict';
	myMongo.removeCollection();
	response.send( { result: "Collection Removed" } );
});

// inserts a record into the collection
app.get('/insertRecord', function(request, response) { 'use strict';
	console.log("insertRecord called");
	var fileContent = fs.readFileSync('new_poem.json','utf8');
	myMongo.insertIntoCollection(response, JSON.parse(fileContent));
});

// removes a record from the collection
app.get('/removeRecordID', function(request, response) { 'use strict';
	console.log("removeRecordID called");
	console.log("SelectedPoemID: " + JSON.stringify(request.query));
	var selectedPoemID = request.query.selectedPoemID;
	myMongo.removeFromCollection(response, selectedPoemID);
	response.send( { result: "Success" } );
});

// gets a count of database collection
app.get('/getDocumentCount', function(request, response){
	myMongo.getDocumentCount(response);
});

// Default route to public folder
app.get('/', function(request, result) {'use strict';
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	//var html = fs.readFileSync(__dirname + '/jasmineTest01.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});

app.get('/testAwake', function(request, response) { 'use strict';
	response.send("I am awake.");
});

app.use("/", express.static(__dirname + '/Public'));
app.use("/", express.static(__dirname + '/lib'));
app.use("/", express.static(__dirname + '/src'));
app.use("/", express.static(__dirname + '/Tests'));

app.listen(ePort);
console.log('Listening on port: ' + ePort);
