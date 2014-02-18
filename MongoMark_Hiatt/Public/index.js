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
		var uploadUserDocumentResult = $('#uploadUserDocumentResult');
        // Call the server's app.get('/read', function() {}); 
        $.get('/uploadDocument', function(data) {
            // do something with HTML sent from the server  <<<<<<<<<<<<<<<<<<< ADD CODE <<<<<<<<<<<<<<<<<<<
        	uploadUserDocumentResult.html(data.result);
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
		$.get('/getDocumentParse', function(data) {
			getDocumentParseResult.html("The document you requested was " + data.result);
		});
	};

	// reads the document from the mongo database
	var getDocumentData = function(){
		var getDocumentDataResult = $('#getDocumentDataResult');
        // Call the server's app.get('/read', function() {}); 
        $.get('/read', function(data) {
            // do something with HTML sent from the server  <<<<<<<<<<<<<<<<<<< ADD CODE <<<<<<<<<<<<<<<<<<<
        	getDocumentDataResult.html(data.result);
        }).error(function(err) {
            console.log(err.responseText);
        });
    };
    
    var showUserSelection = function(){
    	if($("#first").is('checked')){
    		$.get("htmlFile.htm", function(data){
    			var html = $("#first-section",'<div>'+data+'</div>')
    				.nextUntil('#second-section')
    				.andSelf();
    			$('#showData').html(html);
    			return html;
    		});
    	};
    	if($("#second").is('checked')){
    		$.get("htmlFile.htm", function(data){
    			var html = $("#second-section",'<div>'+data+'</div>')
    				.nextUntil('#third-section')
    				.andSelf();
    			$('#showData').html(html);
    			return html;
    		});
    	};
    	if($("#third").is('checked')){
    		$.get("htmlFile.htm", function(data){
    			var html = $("#third-section",'<div>'+data+'</div>')
    				.nextUntil('#end')
    				.andSelf();
    			$('#showData').html(html);
    			return html;
    		});
    	};
    	if ($("#highlight").is(':checked')) {
    		$('#showData').load("htmlFile.htm") 
    			.andSelf().css("background", "#668800");
    	};
    };

    // return the constructor.
    return Run;
})();

$(document).ready(function() {
    new Run();
});

//=======================


var RouteMark = ( function() {

		// Constructor
		function RouteMark() {
			$("#getFeet").click(getFeetParse);		// use function "getFeet" to return the object
			$("#getXFeet").click(getXFeet);
			$("#getCircumference").click(getCircumference);
		}

		var getFeet = function() {
			var getFeetResult = $('#getFeetResult');
			nineResult.load('/getFeet', function(response, status, xhr) {
				if (status == "error") {
					getFeetResult.html("Error: <strong>" + xhr.statusText + "</strong>");
				}
			});
		};
		
		// parses out the data result to text that is easier to read for the user.
		var getFeetParse = function() {
			var getFeetResult = $('#getFeetResult');
			$.get('/getFeet', function(data) {
				getFeetResult.html("One mile is <strong>" + data.result + "</strong> feet.");
			});
		};

		// passes an object with parameters to use in the function.
		var getXFeet = function() {
			var userMiles = $("#userMiles").val();

			$.ajax({
				url : "/getXFeet",
				type : "GET",
				data : {
					"userMiles" : userMiles
				},
				dataType : "json",
				success : function(data) {					
					$("#getXFeetResult").html(userMiles + " miles = " + data.result + " feet.");
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		};

		var getCircumference = function() {
			var userRadius = $("#userRadius").val();

			$.ajax({
				url : "/getCircumference",
				type : "POST",
				data : {
					"userRadius" : userRadius
				},
				dataType : "json",
				success : function(data) {					
					$("#getCircumferenceResult").html("A circle with the radius of " + userRadius + " has a circumference of: " + data.result);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(jqXHR.responseText);
					console.log(textStatus);
					console.log(errorThrown);
				}
			});
		};

		// Return constructor
		return RouteMark;
	}());

$(document).ready(function() {
	new RouteMark();
}); 