/**
 * @author Chelsa Hiatt
 * 
 * Calls made from client to the web server
 */

var Run = (function() {

    // Constructor for module pattern
    function Run() {
    	$("#uploadUserDocument").click(uploadDocument);		// use function "getDocumentPost" to return the whole document
    	$("#getDocumentPost").click(getDocumentPost);		// use function "getDocumentPost" to return the whole document
    	$("#getDocumentParse").click(getDocumentParse);		// use function "getDocumentPost" to return the whole document
    	$("input[name=userSelection]:radio").click(showUserSelection);
    }
    
	// uploads the document to the mongo database
	var uploadDocument = function(){
		//var userUploadDocument = $('#userDocument');
		var userUploadDocument = 'sample.md';
		var uploadUserDocumentResult = $('#uploadUserDocumentResult');
		
        // Call the server's app.get('/uploadDocument', function() {}); 
        $.get('/uploadDocument', function(data) {
        	//uploadUserDocumentResult.html(data.result);
        	uploadUserDocumentResult.html("Upload was successful.");
        }).error(function(err) {
            console.log(err.responseText);
            uploadUserDocumentResult.html(err.responseText);
        });
    };
    
	var getDocumentPost = function() {
		var userChoice = $("#userChoice").val();

		$.ajax({
			url : "/getDocumentPost",
			type : "POST",
			data : {
				"userChoice" : userChoice
			},
			dataType : "json",
			success : function(data) {					
				$("#getDocumentPostResult").html("<div>Text from " + userChoice + ":<br/> " + data.result+"</div>");
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.log(jqXHR.responseText);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	};    
	
	// parses out the document returned in result to text that is easier to read for the user.
	var getDocumentParse = function() {
		var getDocumentParseResult = $('#getDocumentParseResult');
		$.get('/read', function(data) {
			showUserSelection(data.result);
			getDocumentParseResult.html("The document you requested contents: " + data.result);
		});
	};

	// reads the document from the mongo database
	var getDocumentData = function(){
		var getDocumentDataResult = $('#getDocumentDataResult');
        // Call the server's app.get('/read', function() {}); 
        $.get('/read', function(data) {
        	// displays all data returned
        	getDocumentDataResult.html("Here is all: "+data.result);
        }).error(function(err) {
            console.log(err.responseText);
        });
    };
    
    var showUserSelection = function(){
    	if($("#first").is('checked')){
    		$.get("outputPandoc.html", function(data){
    			var html = $("#first",'<div>'+data+'</div>')
    				.nextUntil('#second')
    				.andSelf();
    			$('#showData').html(html);
    			return html;
    		});
    	};
    	if($("#second").is('checked')){
    		$.get("outputPandoc.html", function(data){
    			var html = $("#second",'<div>'+data+'</div>')
    				.nextUntil('#third')
    				.andSelf();
    			$('#showData').html(html);
    			return html;
    		});
    	};
    	if($("#third").is('checked')){
    		$.get("outputPandoc.html", function(data){
    			var html = $("#third",'<div>'+data+'</div>')
    				.nextUntil('#end')
    				.andSelf();
    			$('#showData').html(html);
    			return html;
    		});
    	};
    	if ($("#highlight").is(':checked')) {
    		$('#showData').load("outputPandoc.html") 
    			.andSelf().css("background", "#668800");
    	};
    };

    // return the constructor.
    return Run;
})();

$(document).ready(function() {
    new Run();
});