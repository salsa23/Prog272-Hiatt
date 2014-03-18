/**
 * @author Charlie Calvert
 */

require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.11.0.min",
    //"jquery": "jquery-1.11.0.min",
    "bootstrap":"bootstrap.min.js",
    "clientMongo": "ClientMongo", 
    "awsui": "AwsUi"
  },
	shim : {
		//'jasmine' : {
		//	exports : 'jasmine'
		//},
		//'jasmine-html' : {
		//	deps : ['jasmine'],
		//	exports : 'jasmine'
		//},
		//'boot' : {
		//	deps : ['jasmine', 'jasmine-html'],
		//	exports : 'jasmine'
		//}
	}
});

require(["jquery","awsui", "clientMongo"], function(j, awsui, clientMongo) {
	console.log("Main called.");
	clientMongo();
	awsui();
});
