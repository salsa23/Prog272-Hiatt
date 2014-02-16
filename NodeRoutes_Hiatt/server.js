/**
 * @author Chelsa Hiatt
 */

var express = require('express');
var app = express();
var fs = require('fs');
var getFeet = require('./Library/GetFeet');
var calculator = require('./Library/Calculator');

app.use(express.bodyParser());   // used with app.post (Built in Express tool)

var port = process.env.PORT || 30025;

// getFeet called from html using $get or $JSON
app.get('/getFeet', function(request, response) {
	console.log('getFeet called');
	response.send({ "result": getFeet.getFeet() });
});

// With a get, the parameters are passed in request.query
app.get('/getXFeet', function(request, response) {
	console.log('getXFeet called');	
	console.log(request.query);	
	var userMiles = parseInt(request.query.userMiles);
	var result = calculator.myCalc.getXFeet(userMiles);
	response.send({ "result": result });
});

/* To handle a post, we have to add express.bodyParser, shown above
   Now our parameters come in on request.body */
app.post('/getCircumference', function(request, response) {
	console.log('getCircumference called');	
	console.log(request.body);	
	var userRadius = parseInt(request.body.userRadius);
	var result = calculator.myCalc.getCircumference(userRadius);
	response.send({ "result": result });
});


app.get('/', function(request, response) {
	var html = fs.readFileSync(__dirname + '/Public/index.html');
	response.writeHeader(200, {"Content-Type": "text/html"});   
	response.write(html);
	response.end();
});


app.use("/", express.static(__dirname + '/Public'));
app.listen(port);
console.log('Listening on port :' + port);