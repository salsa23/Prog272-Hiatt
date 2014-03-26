// Handle Ajax and maintain list of data 
define('clientMongo', function() {'use strict';

	var mongoData = [];

	function ClientMongo() {
		console.log("Client Mongo constructor called");
		readAll();
		//loadNewOptionsDefault();
	}


	var getDocument = function(event, request) {		
		request.callback(mongoData[request.index]);
	};

	var insertNewDocument = function(event, callback) {
		console.log("insert New Document called");
		$.getJSON('/insertJson', function(newData) {
			mongoData = mongoData.concat(newData.mongoDocument);			
			//callback(newData.mongoDocument, mongoData);			
		});
	};

	var readAll = function(event, callback) {
		console.log("readAll called");
		$.getJSON('/readAll', function(data) {
			mongoData = data;
			//callback(data);
		});
	};

	var readTwo = function(event, callback) {
		console.log("readTwo called");
		$.getJSON('/readTwo', function(data) {
			mongoData = data;
			//callback(data);
		});
	};

	var readCountDocuments = function(event, publishedRequest) {
		console.log("readTwo called");
		var request = {};
		request.numRequested = publishedRequest.numRequested;
		$.getJSON('/readDocuments', request, function(data) {
			mongoData = data;
			publishedRequest.callback(mongoData);
		});

	}; 
	
	var removeAll = function(event, callback) {
		$.getJSON('/removeAll', function(data) {
			//callback(data);
		});
	};

	return ClientMongo; 
});

