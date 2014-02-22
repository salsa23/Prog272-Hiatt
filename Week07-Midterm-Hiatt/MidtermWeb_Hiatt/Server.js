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

app.get('/readOne', function(request, response) { 'use strict';
	console.log('readOne called');
	console.log('from readAll --request: '+ request);
	myMongo.getCollectionCount(response, 2);
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
