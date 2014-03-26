	var fs = require('fs');
	var mkdirp = require('mkdirp');

	function fileProcess(){
		console.log("fileProcess constructor called");
	}

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

	function writeFile(filePathName, fileContent) {
		fs.writeFile(filePathName, fileContent, function(err) {
			if(err){
				throw err;
			}
			else{
				console.log("Successfully created file: "+filePathName);
			}
		});
	};

exports.fileProcess = fileProcess;
	//makeDir(folder);
	//writeFile(folder+fileName);

