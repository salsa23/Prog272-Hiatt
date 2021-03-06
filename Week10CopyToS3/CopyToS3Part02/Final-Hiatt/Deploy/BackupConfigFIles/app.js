/**
 * Module dependencies.
 */

var express = require('express');
//var routes = require('./routes');
//var user = require('./routes/user');
var http = require('http');
var path = require('path');
var walkDirs = require("./Source/WalkDirs").walkDirs;
var s3Code = require("./Source/S3Code");
var fs = require('fs');
var exec = require('child_process').exec;
// added CMH
var qm = require('./Source/QueryMongo');
var queryMongo = qm.QueryMongo;
var walk = require('./Source/WalkSonnets').walk;
//var mkdirp = require('mkdirp');
//var fileProcess = require('./Source/fileProcess');

var app = express();

// all environments
app.set('port', process.env.PORT || 30025);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'Source')));
app.use(express.static(path.join(__dirname, 'Images')));
app.use(express.favicon('Images/favicon16.ico'));
// app.use(express.favicon(path.join(__dirname, 'favicon16.ico')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', function(request, response) {
    var html = fs.readFileSync(__dirname + '/public/index.html');
    response.writeHeader(200, {"Content-Type": "text/html"});   
    response.write(html);
    response.end();
});

//app.get('/', routes.index);
// app.get('/users', user.list);

/*
 * You will need to edit one or more objects in Options.json. 
 * They have this general format

var options = {
		pathToConfig: '/home/charlie/config.json',		
		reallyWrite: true, 
		bucketName: 'bucket01.elvenware.com',
		folderToWalk: "Files",
		s3RootFolder: "FilesTwo",
		createFolderToWalkOnS3: true,
		createIndex: true,
		filesToIgnore: ['Thumbs.db', '.gitignore', 'MyFile.html']
};
 
 * Before filling it out, see the README file for this project. 
 */	

// returns options by reading Options JSON file
app.get('/getOptions', function(request, response) {'use strict';
	var options = fs.readFileSync("Options.json", 'utf8');
	options = JSON.parse(options);
	response.send(options);
});

// returns options by reading MarkdownTransformConfig JSON file
app.get('/getBuildConfig', function(request, response) { 'use strict';
	console.log('getBuildConfig called');
	var options = fs.readFileSync("MarkdownTransformConfig.json", 'utf8');
	options = JSON.parse(options);
	response.send(options);
});

// NEW ADDED reading content object from MongoDB
// returns markdown config options from database
app.get('/getDBBuildConfig', function(request, response) {'use strict';
	console.log('getDBBuildConfig called');
	console.log(typeof request);
	console.log(request.query);
	request.query = { 'fileType': 'Markdown Config'};
	console.log("Request.query:");
	console.log(request.query);
	queryMongo.findInCollection(response, request.query, function(theArray){
		console.log('Mardown Options from DB: ');
		console.log(JSON.stringify(theArray));
		response.send(theArray);
	});
});

// NEW ADDED reading content object from MongoDB
// returns aws config options from database
app.get('/getDBOptions', function(request, response) {'use strict';
	console.log('getDBOptions called');
	console.log(typeof request);
	console.log(request.query);
	request.query = { 'fileType': 'AWS Config'};
	console.log("Request.query:");
	console.log(request.query);
	queryMongo.findInCollection(response, request.query, function(theArray){
		console.log('AWS Options from DB: ');
		console.log(JSON.stringify(theArray));
		response.send(theArray);
	});
});

app.get('/listBuckets', function(request, response) {'use strict';
    console.log("ListBuckets called");
    console.log(request.query);
	var options = JSON.parse(request.query.options);
	console.log("ListBuckets: ", options.pathToConfig);
	s3Code.loadConfig(options.pathToConfig);
	s3Code.listBuckets(response, true);
});

app.get('/copyToS3', function(request, response) {'use strict';
	console.log(typeof request.query.options);	
	var options = JSON.parse(request.query.options);
	console.log(options);
	walkDirs(options, response);
});

var buildAll = function(response, config, index) { 'use strict';
	console.log("BuildAll was called");
	// var config = fs.readFileSync("MarkdownTransformConfig.json", 'utf8');	
	// config = JSON.parse(config);
	var command = config[index].pathToPython + " MarkdownTransform.py -i " + index;	
	try {
		exec(command, function callback(error, stdout, stderr) {
			// Read in the HTML send the HTML to the client
			console.log("convertToHtml was called er: ", error);
			console.log("convertToHtml was called so: ", stdout);
			console.log("convertToHtml was called se: ", stderr);
			response.send({ "result": "Success", "data": stdout });
		});
	} catch(e) {
		console.log(e.message);
		response.send( { "result" : "error", "data": e });
	}
};

app.get('/buildAll', function(request, response) { 'use strict';
	console.log("buildAll called");	
	var options = JSON.parse(request.query.options);
	buildAll(response, options, request.query.index);
});

app.get('/exportConfigToFile', function(request, response){
	console.log('exportConfigToFile SERVER called');
	console.log(request.query);
	console.log(JSON.stringify(request.query.transformOptions));
	var fileStringContent = JSON.stringify(request.query.transformOptions);
	//console.log(typeof fileStringContent);
	var folderPath = "/home/adminuser/Dev/Deploy/MarkdownTransformConfig.json";
	//var folderPath = "MarkdownTransformConfigDB.json";
	// save MarkdownTransform config to file
	fs.writeFile(folderPath, fileString, 'utf8', function(err) {
		if(err){
			throw err;
		}else{
			console.log("Successfully wrote config file to: /home/adminuser/Dev/Deploy/MarkdownTransformConfig.json");
		}
	});
	//console.log(JSON.stringify(request.query.options));
	fileStringContent = JSON.stringify(request.query.options);
	folderPath = "/home/adminuser/Dev/Deploy/Options.json";
	// save AWS config to file
	fs.writeFile(folderPath, fileStringContent, 'utf8', function(err) {
		if(err){
			throw err;
		}else{
			console.log("Successfully wrote config file to: /home/adminuser/Dev/Deploy/Options.json");
		}
	});
});

app.get('/exportFromDatabase', function(request, response){
	//
});

// NEW ADDED -- add call from AwsUI.js file to call adding request = { options: xxxx }
// insert FOLDER of files into Mongo
app.get('/copyToMongo', function(request, response) {'use strict';
	console.log(typeof request.query.options);
	var options = JSON.parse(request.query.options);
	console.log(options);
	// code from AwsUI.js options to copy from folder location use WalkDirs as template
	// var location = options.copyFrom;
	// add code to find all files in the folder and push to an array 
});


// NEW -- Read MongoDB collection
app.get('/readAll', function(request, response) {'use strict';
	queryMongo.getAllDocuments(response);
});

// NEW - NOT USED 
app.get('/insertJson', function(request, response) { 'use strict';
	//message("Server side request for newDocument route");
	var fileContent = fs.readFileSync('Presidents.json', 'utf8');
	queryMongo.insertIntoCollection(response, JSON.parse(fileContent));
});

// NEW INSERT User Config 
app.get('/insertUserConfig', function(request, response) { 'use strict';
	console.log("insertUserConfig called Server side");
	console.log("SAMPLE DATA SERVER SIDE");
	console.log("=======================");
	// array first sends markdown options file, then AWS options
	console.log(request.query.insertObject[0].content[0].pathToPython);
	queryMongo.insertIntoCollection(response, request.query.insertObject);
});

//NEW Update Collection
app.get('/updateCollection', function(request, response) { 'use strict';
	console.log("/updateCollection called Server side");
	console.log("UPDATE REQUEST (request.query): ");
	console.log(request.query);
	queryMongo.updateCollection(response, request.query);
});

// NEW insert BOTH Default Config JSON Files into Mongo
app.get('/insertDefaultConfigJson', function(request, response) { 'use strict';
	console.log("insertDefaultConfigJson called");
	var mdFile = {
		"fileType":"Markdown Config",
		"itemName": "Markdown Transform Default",
		"fileName": "MarkdownTransformConfig.json",
		"folderPath": "",
		"keywords" : ["config", "markdown"]
		};
	var awsFile = {
		"fileType":"AWS Config",
		"itemName": "AWS Options Default",
		"fileName": "Options.json",
		"folderPath": "",
		"keywords" : ["config", "aws"]
		};
	
	mdFile.content = JSON.parse(fs.readFileSync('MarkdownTransformConfig.json', 'utf8'));
	awsFile.content = JSON.parse(fs.readFileSync('Options.json', 'utf8'));
	var arrayToInsert = [ mdFile, awsFile ];
	console.log("array[0].content[0]: ")
	console.log(arrayToInsert[0].content[0]);
	
	queryMongo.insertIntoCollection(response, arrayToInsert);
});

// NEW - NOT USED
// read file out of MongoDB
app.get('/readFileOut', function(request, response) {
	console.log('readFileOut called');
	queryMongo.readFileOut(response);
});


// added to walk directories
function getHomeDir() {
	var homeDir = null;
	if (os.platform() === 'linux') {
		homeDir = process.env.HOME;
	} else if (os.platform() === 'win32') {
		homeDir = process.env.USERPROFILE;
	}
	return homeDir;
}

// added to walk directories
app.get('/walk', function(request, response) {
	// If you run Node in Eclipse, to access JSOBJECTS, you made need 
	// to choose Run | Run Configurations | Environment | Select
	
	//var dirToWalk = process.env.JSOBJECTS;
	//var dirToWalk = getHomeDir + request.query.dir;
	
	/*	request from DatabaseUI.js file sent: 
	 * request.query: { 
				uploadDir: dbOptions.uploadDir,
				fileType: dbOptions.fileType,
				keywords: dbOptions.keywords,
				saveToDir: dbOptions.saveToDir
			};
	*/
	var dirToWalk = "/home/adminuser/Dev/Dropbox/sonnetsMD";
	console.log("About to walk: " + dirToWalk);
	walk(dirToWalk, ['Sonnet01.md'], ['node_modules', 'JavaScript'], function(err, data) {
		if (err) {
			console.log(err);
			response.send({
				result : "Error",
				error : err
			});
		} else {
			console.log(data);
			response.send({
				result : "Success",
				files : data
			});
		}
	});

});


http.createServer(app).listen(app.get('port'), function() {'use strict';
	console.log('Express server listening on port ' + app.get('port'));
});

