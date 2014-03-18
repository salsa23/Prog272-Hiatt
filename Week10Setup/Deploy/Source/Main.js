/**
 * @author Charlie Calvert
 */

require.config({
  paths: {
    //"jquery": "http://code.jquery.com/jquery-1.11.0.min",
    "jquery": "jquery-1.11.0.min",
    "bootstrap":"bootstrap.min.js",
    "mongodb": "QueryMongo",
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
		'jquery': {
          exports: '$'
        },
        //'underscore': {
        //  deps:["jquery"],
        //  exports: '_'
        //},
		'mongodb': {
			deps : ["_"],
			exports : 'mongodb'
		}
	}
});

require(["_","mongodb", "awsui"], function(m, awsui) {
	console.log("Main called.");
	m.querymongo();
	awsui();
});
