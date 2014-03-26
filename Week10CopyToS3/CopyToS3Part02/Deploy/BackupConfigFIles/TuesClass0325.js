var fs = require('fs');
var mkdirp = require('mkdirp');

function makeDir(folderName) {
	mkdirp(folderName, function(err){
		if(err){
			throw err;
		}
		else{
			console.log("Successfully created folder: "+folderName);
		}
	});
};

function writeFile(fileName) {
	fs.writeFile("path string with file name", "what you want the file called", function(err) {
		if(err){
			throw err;
		}
		else{
			console.log("Successfully created file: "+fileName);
		}
	});
};


makeDir(folder);
writeFile(folder+fileName);
