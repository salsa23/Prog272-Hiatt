var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

var url01 = 'mongodb://127.0.0.1:27017/test';
var url02 = 'mongodb://192.168.2.19:27017/test';

  MongoClient.connect(url01, function(err, db) {'use strict';
    if(err) {throw err;}
    
    var collection = db.collection('test_data');
    
    // array to hold collection objects to insert
    var dataArray = [];
    
    // populate the array with address fields
    for (var i = 10000; i < 10251; i = i + 1) {
		var person = {
			firstName : 'Rita' + i,
			lastName : 'Hill' + i,
			address : i + " " + "Ruby Street",
			city : 'Bellevue',
			state : 'WA',
			zip : '98002'
		};
		// add the new person to the array
		dataArray.push(person);
		}
		
    // insert array into collection
    collection.insert(dataArray, function(err, docs) {
      	collection.count(function(err, count) {
        console.log(format("count = %s", count));
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.dir(results);
        // close the db
        db.close();
      });
    });
  });