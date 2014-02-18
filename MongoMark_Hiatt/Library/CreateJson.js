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
	var uploadPath = "../";					// use after confirm upload works to remove hard-coded path
	var uploadFileName = 'sample.md';		// used after confirm upload code works so you can re-use code and not hard-code file name
	var getFile = 'sample.md';				// used after get file code works to remove hard coded file name
	
	// Constructor
	function FileProcess() {
		console.log("FileProcess.Constructor called");
		
		// USER INPUT ----> to be used in future release, commented out for now
		// var userUploadFile = $('#userDocument').val();
		// var userGetFile = $('#userChoice').val();
		// add portion to set upload file and get file values with user data for
		// future release.
	}
	
	// function to upload file
	FileProcess.prototype.uploadFile = function() {
		// reads the file contents to upload
		var uploadContents = fs.readFileSync('../sample.md', 'utf8');

		// make file into JSON
		var fileToJson = {
			docFileName : 'sample.md',
			docContents : uploadContents
		};
		// for debugging  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< Comment out after working <<<<<<<<<<<<<<<<<<
		console.log("The JSON is: "+fileToJson);

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
		var outputHTMLFile = 'outputPandoc.html';
		var outputMDFile = 'output.md';
		// var i = $('#userChoice').val(); // will be used in future version to
		// select the file the users wants using a filter	// added in future release

		// find the file in the collection and output to html file
		collection.find().toArray(function(err, mongoArray) {
			// write to htmlFile.html file
			fs.writeFileSync(inputFile, mongoArray[0].docText);
			console.log("outputFile has been created.");
		});
		
		// convert newly export Markdown file to html using outside program: Pandoc
		exec('pandoc -t html5 -o outputPandoc.html output.md', function callback(error,
				stdout, stderr) {
			// Read in the document, send the HTML to the client
			var html = fs.readFileSync('outputPandoc.html');
			return html;
		});
	};
	
	return FileProcess;

})();

exports.fileProcess = new FileProcess();
