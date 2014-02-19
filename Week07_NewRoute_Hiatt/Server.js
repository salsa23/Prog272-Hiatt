/**
 * @author Charlie Calvert
 */

var express = require('express');
var app = express();
var format = require('util').format;
var fs = require('fs');
var qm = require('./Library/QueryMongo');
var queryMongo = qm.QueryMongo; 

// Read the collection - 2 calls: one for read all, one for read 2 - goes to Public/index.js
app.get('/readAll', function(request, response) {'use strict';
	// calls mongo get collection function, 
	// passes in response object so that we can send the response back to the client
	queryMongo.getCollection(response);
});

app.get('/readTwo', function(request, response) { 'use strict';
	// hard coded number 2 parameter
	queryMongo.getCollectionCount(response, 2);
});

app.get('/insertRecord', function(request, response) { 'use strict';
	var fileContent = fs.readFileSync('Data.json','utf8');
	queryMongo.insertIntoCollection(JSON.parse(fileContent));
	response.send( { result: "Success" } );
});

// Default.
app.get('/', function(request, result) {'use strict';
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	result.writeHeader(200, { "Content-Type" : "text/html" });
	result.write(html);
	result.end();
});

app.use("/", express.static(__dirname + '/Public'));
app.use("/", express.static(__dirname + '/Library'));

app.listen(30025);
console.log('Listening on port 30025');
