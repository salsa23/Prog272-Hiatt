define(['jquery'], function() {'use strict';

    var buttons = null;
    var options = null;					// AWS options
    var transformOptions = null;		// Markdown Transform options
    var dataIndex = 0;					// AWS options index
    var dataIndexTransform = 0;			// Markdown Transform options index
    var useInput = false;

    function AwsUi(useInputInit) {
		if (typeof useInputInit === 'undefined') {
			$("#listBuckets").click(listBuckets);
			$("#copyToS3").click(copyToS3);
			$("#getOptions").click(getOptions);
			$("#transformForwardButton").click(forwardTransform);
			$("#tranformBackButton").click(backwardTransform);
			$("#forwardButton").click(forward);
			$("#backButton").click(backward);
			$("#insertConfigFiles").click(insertConfigFiles);
			$("#uploadInputConfig").click(uploadInputOptions);
			$("#saveInputConfig").click(updateDBConfig);
			$("#buildAll").click(buildAll);
			getBuildConfig();
			getOptions();
		} else {
			useInput = useInputInit;
			$("#listBuckets").click(listBuckets);
			$("#copyToS3").click(copyToS3);
			$("#getOptions").click(getOptions);
			$("#transformForwardButton").click(forwardTransform);
			$("#tranformBackButton").click(backwardTransform);
			$("#forwardButton").click(forward);
			$("#backButton").click(backward);
			$("#insertConfigFiles").click(insertConfigFiles);
			$("#uploadInputConfig").click(uploadInputOptions);
			$("#saveInputConfig").click(updateDBConfig);
			$("#buildAll").click(buildAll);
			getBuildConfig();
			getOptions();
		}

    }

    var buildAll = function() {
        $.getJSON("/buildAll", {
            options : JSON.stringify(transformOptions),
            index : dataIndexTransform
        }, function(result) {
            $("#buildData").empty();
            var fileArray = result.data.split("\n");
            for (var i = 0; i < fileArray.length; i++) {
                if (fileArray[i].length > 0) {
                    $("#buildData").append("<li>" + fileArray[i] + "</li>");
                }
            }
        });
    };

    var copyToS3 = function() {
        $.getJSON("/copyToS3", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyResult").html("Result: " + data.result);
        });
    };
    
    // NEW ADDED CMH to copy files to Mongo from Folder
    var copyToMongo = function() {
        $.getJSON("/copyToMongo", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            $("#copyDBResult").html("Result: " + data.result);
        });
    };
    

	// NEW CMH insertConfigFiles - BOTH Default files to MongoDB
	// use array[i].content[i] to retrieve config back
	var insertConfigFiles = function(event, callback) {
		console.log("insert insertConfigFiles called");
		$.getJSON('/insertDefaultConfigJson', function(newData) {
			console.log("Default config files upload was successful");	
		});
	};
	
	// add user values for Markdown Transform options
	var saveMDInput = function(){
        transformOptions[dataIndexTransform].pathToPython = $("#newPathToPython").val();
        transformOptions[dataIndexTransform].copyFrom = $("#newCopyFrom").val();
        transformOptions[dataIndexTransform].copyTo = $("#newCopyTo").val();
        transformOptions[dataIndexTransform].filesToCopy = $("#newFilesToCopy").val();
	};

	// add user values for AWS
	var saveAWSInput = function (){       
        options[dataIndex].pathToConfig = $("#newPathToConfig").val();
        options[dataIndex].reallyWrite = $("#newReallyWrite").val();
        options[dataIndex].bucketName = $("#newBucketName").val();
        options[dataIndex].folderToWalk = $("#newFolderToWalk").val();
        options[dataIndex].s3RootFolder = $("#newS3RootFolder").val();
        options[dataIndex].createFolderToWalkOnS3 = $("#newCreateFolderToWalkOnS3").val();
        options[dataIndex].createIndex = $("#newCreateIndex").val();
        options[dataIndex].filesToIgnore = $("#newFilesToIgnore").val();
	};
    
    // NEW ADDED CMH to save input config changes to Mongo
    var uploadInputOptions = function() {
		console.log("uploadInputOptions called");
	
		var mdFile = {
			"type": "Markdown Config",
			"itemName": "Markdown Transform User Input",
			"fileName": "",
			"folderPath": "",
			"keywords" : ["config", "markdown"]
		}
		var awsFile = {
			"type":"AWS Config",
			"itemName": "AWS Options User Input",
			"fileName": "",
			"folderPath": "",
			"keywords" : ["config", "aws"]
		}
		
		// save Input values to local Markdown Transform Options and save as content
		saveMDInput(); 
        mdFile.content = transformOptions;
        console.log("input options upload PATH TO PYTHON sample");
        console.log(mdFile.content[dataIndexTransform].pathToPython);
                
        // add Input values to local AWS options and save as content
        saveAWSInput();
		awsFile.content = options;
		console.log("input options upload BUCKET NAME sample");
        console.log(awsFile.content[dataIndex].bucketName);
        
        // put objects into an array to pass
		var config = [ mdFile, awsFile ];
		
		// ADD CODE TO WRITE TO FILE
		// TO BE ADDED IN THE FUTURE
		
		// Code to Save config to Mongo
		var request = {};
		request.insertObject = config;
		$.getJSON('/insertUserConfig', request, function(newData){
			alert("Your Config was INSERTED");
		});
		
	};
	
	var updateDBConfig = function() {
		// save any input changes
		saveMDInput();
		saveAWSInput();
		
		// create query to find Markdown DB object
		var updateDetails = { "type":"Markdown Config", "content": transformOptions};
		// query DB and update Markdown
		saveConfig(updateDetails);
		
		// create query to find AWS DB object
		var updateDetails = { "type":"AWS Config", "content": options};
		// query DB and update Markdown
		saveConfig(updateDetails);
	};
	
	// update config object - WORK IN PROGRESS
	var saveConfig = function(updateDetails) {
	    var request = { 
	        query: { "type": updateDetails.type },
	        update: {
	            $set: { "content" : updateDetails.content }
	        }    
	    };
	    $.getJSON('/update', request, function(data) {
            alert("Your changes were UPDATED");
        });
	};
	
    var displayTransformConfig = function(options) {
		if (useInput) {
	        $("#newPathToPython").val(options.pathToPython);
	        $("#newCopyFrom").val(options.copyFrom);
	        $("#newCopyTo").val(options.copyTo);
	        $("#newFilesToCopy").val(options.filesToCopy);
	        $("#pathToPython").html(options.pathToPython);
			$("#copyFrom").html(options.copyFrom);
			$("#copyTo").html(options.copyTo);
			$("#filesToCopy").html(options.filesToCopy);
		} else {
			$("#pathToPython").html(options.pathToPython);
			$("#copyFrom").html(options.copyFrom);
			$("#copyTo").html(options.copyTo);
			$("#filesToCopy").html(options.filesToCopy);
		}
    };

    var displayOptions = function(options) {
		if (useInput) {
			$("#currentDocument").html(dataIndex + 1);
			$("#pathToConfig").html(options.pathToConfig);
			$("#reallyWrite").html(options.reallyWrite ? "true" : "false");
			$("#bucketName").html(options.bucketName);
			$("#folderToWalk").html(options.folderToWalk);
			$("#s3RootFolder").html(options.s3RootFolder);
			$("#createFolderToWalkOnS3").html(options.createFolderToWalkOnS3 ? "true" : "false");
			$("#createIndex").html(options.createIndex ? "true" : "false");
			$("#filesToIgnore").html(options.filesToIgnore);
      
	        //$("#currentDocument").html(dataIndex + 1);
	        $("#newPathToConfig").val(options.pathToConfig);
	        $("#newReallyWrite").val(options.reallyWrite ? "true" : "false");
	        $("#newBucketName").val(options.bucketName);
	        $("#newFolderToWalk").val(options.folderToWalk);
	        $("#newS3RootFolder").val(options.s3RootFolder);
	        $("#newCreateFolderToWalkOnS3").val(options.createFolderToWalkOnS3 ? "true" : "false");
	        $("#newCreateIndex").val(options.createIndex ? "true" : "false");
	        $("#newFilesToIgnore").val(options.filesToIgnore);
		} else {
			$("#currentDocument").html(dataIndex + 1);
			$("#pathToConfig").html(options.pathToConfig);
			$("#reallyWrite").html(options.reallyWrite ? "true" : "false");
			$("#bucketName").html(options.bucketName);
			$("#folderToWalk").html(options.folderToWalk);
			$("#s3RootFolder").html(options.s3RootFolder);
			$("#createFolderToWalkOnS3").html(options.createFolderToWalkOnS3 ? "true" : "false");
			$("#createIndex").html(options.createIndex ? "true" : "false");
			$("#filesToIgnore").html(options.filesToIgnore);
		}
    };

	// sets Markdown Transform options
    var getBuildConfig = function() {
        $.getJSON("/getBuildConfig", function(optionsInit) {
            transformOptions = optionsInit;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };
    
    // sets AWS options
    var getOptions = function() {
        $.getJSON("/getOptions", function(optionsInit) {
            options = optionsInit;
            $('#documentCount').html(options.length);
            displayOptions(options[0]);
        }).fail(function(a) {
            alert(JSON.stringify(a));
        });
    };

    var forwardTransform = function() {
        if (dataIndexTransform < transformOptions.length - 1) {
            dataIndexTransform++;
            displayTransformConfig(transformOptions[dataIndexTransform]);
        }
    };

    var backwardTransform = function() {
        if (dataIndexTransform > 0) {
            dataIndexTransform--;
            displayTransformConfig(transformOptions[dataIndexTransform]);
            return dataIndexTransform;
        }
        return dataIndexTransform;
    };

    var forward = function() {
        if (dataIndex < options.length - 1) {
            dataIndex++;
            displayOptions(options[dataIndex]);
        }
    };

    var backward = function() {
        if (dataIndex > 0) {
            dataIndex--;
            displayOptions(options[dataIndex]);
            return true;
        }
        return false;
    };

    var listBuckets = function() {
        $.getJSON("/listBuckets", {
            options : JSON.stringify(options[dataIndex])
        }, function(data) {
            for (var i = 0; i < data.length; i++) {
                $("#buckets").append("<li>" + data[i] + "</li>");
            }
        });
    };

    return AwsUi;
});
/*
 $(document).ready(function() { 'use strict';
 new AwsUi();
 }); */