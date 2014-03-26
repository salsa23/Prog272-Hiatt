/**
 * @author Charlie Calvert
 */

require.config({
  paths: {
    "jquery": "http://code.jquery.com/jquery-1.11.0.min",
    //"jquery": "jquery-1.11.0.min",
    "bootstrap":"bootstrap.min.js",
    "clientMongo": "ClientMongo",
    "databaseUI":"DatabaseUI",
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

require(["jquery", "databaseUI", "awsui", "clientMongo"], function(jquery, databaseUI, awsui, clientMongo) {
	console.log("Main called.");
	awsui(true);
	clientMongo();
	databaseUI();
});
