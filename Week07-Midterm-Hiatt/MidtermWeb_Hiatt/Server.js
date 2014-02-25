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
app.get('/readAll', function(request, response) {'use strict';
	console.log('readAll called');
	console.log('from readAll --data: '+ myMongo);
	console.log('from readAll --request: '+ request);
	myMongo.getCollection(response);
});

app.get('/displayRecordID', function(request, response) { 'use strict';
	request.query.id = $(this).val();
	console.log('request query: '+request.query);
	console.log('displayRecordID called');
	console.log('from displayRecordID --request: '+ request);
	console.log('from displayRecordID --requested ID: '+request.id);
	myMongo.getDocumentByID(response);
});

// loads from JSON file on server
app.get('/loadCollection', function(request, response) { 'use strict';
	var fileContent = fs.readFileSync('./src/Shakespeare.json','utf8');
	myMongo.insertIntoCollection(JSON.parse(fileContent));
	response.send( { result: "Database Loaded" } );
});

// removes collection - clears entries
app.get('/removeCollection', function(request, response) { 'use strict';
	var fileContent = fs.readFileSync('./src/Shakespeare.json','utf8');
	myMongo.removeCollection();
	response.send( { result: "Collection Removed" } );
});

// Default route to public folder
app.get('/', function(request, result) {'use strict';
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});

app.use("/", express.static(__dirname + '/Public'));
app.use("/", express.static(__dirname + '/lib'));
app.use("/", express.static(__dirname + '/src'));

app.listen(ePort);
console.log('Listening on port: ' + ePort);
