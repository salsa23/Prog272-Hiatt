/**
 * @author Chelsa Hiatt
 * 
 * Calls made from client to the web server
 */

var Run = (function() {

    // Constructor for module pattern
    function Run() {
    	$("#uploadUserDocument").click(uploadDocument);				
    	$("#getDocument").click(getDocument);				
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
    
/*	var getDocumentPost = function() {
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
*/
	// parses out the document returned in result to text that is easier to read for the user.
	var getDocument = function() {
		var getDocumentResult = $('#getDocumentParseResult');
		$.get('/read', function(data) {
			showUserSelection(data.result);
			getDocumentResult.html("The document you requested contents: " + data.result);
		}).error(function(err) {
            console.log(err.responseText);
        });
	};
    
    var showUserSelection = function(){
    	
    	if($('#first').is('checked')){
    		console.log("within section 1 of show data user choice");
    		$.get('./outputPandoc.html', function(data){
    			var html = $('#stepsfirst','<div>'+data+'</div>')
    				.nextUntil('#whosecond')
    				.andSelf();
    			$('#showData').html(html);
    			console.log("within callback 1");
    		});
    	};
    	if($('#second').is('checked')){
    		$.get('./outputPandoc.html', function(data){
    			var html = $('#whosecond','<div>'+data+'</div>')
    				.nextUntil('#whatthird')
    				.andSelf();
    			$('#showData').html(html);
    		});
    	};
    	if($('#third').is('checked')){
    		$.get('./outputPandoc.html', function(data){
    			var html = $(''#whatthird','<div>'+data+'</div>')
    				.nextUntil('#notesend')
    				.andSelf();
    			$('#showData').html(html);
    		});
    	};
    	if ($("#highlight").is(':checked')) {
    		$('#showData').load("./outputPandoc.html") 
    			.andSelf().css("background", "#668800");
    	};
    };

    // return the constructor.
    return Run;
})();

$(document).ready(function() {
    new Run();
});