/**
 * @author chelsa.hiatt
 */

var express = require('express');
// create an express object
var app = express();

// response to direct url with no parameters
app.get('/', function(req, result){

  var body = 'Express Data';
  result.setHeader('Content-Type', 'text/plain');
  result.setHeader('Content-Length', Buffer.byteLength(body));
  result.end(body);

});

// listen on port 30025
app.listen(30025);
console.log('Listening on port 30025');