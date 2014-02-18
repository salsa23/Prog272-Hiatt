/**
 * @author Chelsa Hiatt Code to read in a markdown file and store it into a
 *         mongo database as a JSON object.
 * 
 * The JSON object stores information regarding the file including: name of the
 * Markdown File, and the text itself. Code includes reading the data back from
 * the database, converting the Markdown into html, sending it to the client
 * browser.
 * 
 * An external program called Pandoc handles conversion from Markdown to HTML.
 */
var fs = require('fs');
// external program that handles conversion from Markdown to HTML
var exec = require('child_process').exec;

var FileProcess = (function() {
	// PRIVATE DATA
	var uploadPath = "../";
	var uploadFileName = 'sample.md';
	var getFile = 'sample.md';

	// USER INPUT ----> to be used in future release, commented out for now
	// var userUploadFile = $('#userDocument').val();
	// var userGetFile = $('#userChoice').val();
	// add portion to set upload file and get file values with user data for
	// future release.

	FileProcess.prototype.uploadFile = function() {
		// reads the file contents to upload
		var uploadContents = fs.readFileSync(uploadPath + uploadFileName, 'utf8');

		// make file into JSON
		var fileToJson = {
			docFileName : uploadFileName,
			docContents : uploadContents
		};

		// insert JSON into collection
		collection.insert(fileToJson, function(err, docs) {
			// Locate all the entries using find
			collection.find().toArray(function(err, theArray) {
				// display collection array results in console
				console.dir(theArray);  //<<<<<<<<<<<<<<<<<<<<<<<< Comment out after working <<<<<<<<<<<<<<
				
				// close the db
				db.close();
			});
		});
	};
	
	// function to read from DB
	FileProcess.prototype.getFile = function() {
		var outputFile = 'htmlFile.html';
		var inputFile = 'sample.md';
		// var i = $('#userChoice').val(); // will be used in future version to
		// select the file the users wants using a filter

		collection.find().toArray(function(err, mongoArray) {
			// write to htmlFile.html file
			fs.writeFileSync(outputFile, mongoArray[0].docText);
			console.log("outputFile has been created.");
		})
		exec('pandoc -t html5 -o htmlFile.html output.md', function callback(error,
				stdout, stderr) {
			// Read in the document, send the HTML to the client

		});
	}
	
	return FileProcess;

})();

var processFile = function() {
	var outputFile = 'htmlFile.html';
	var inputFile = 'sample.md';
	// var i = $('#userChoice').val(); // will be used in future version to
	// select the file the users wants using a filter

	var mongoArray = collection.find().toArray(function(err, results) {

		// write to htmlFile.html file
		fs.writeFileSync(filename, data, [ options ]);
	})
	exec('pandoc -t html5 -o htmlFile.html output.md', function callback(error,
			stdout, stderr) {
		// Read in the document, send the HTML to the client

	});
};
