/**
 * @author Chelsa Hiatt
 * version 2.0
 * Date: 2/3/14
 */

function MyData() {'use strict';
	//button that calls getHtml Paragraph01
	$("#buttonHtml01").click(function() {
		// loads paragraph01
		$('#Div01').load("source/source.html #paragraph01", function() {
			console.log("Load source01 was performed");
			return true;
		});
	});

	//button that calls getHtml Paragraph02
	$("#buttonHtml02").click(function() {
		$('#Div01').load("source/source.html #paragraph02", function() {
			console.log("Load source02 was performed");
			return true;
		});
	});

	//button that calls getHtml Paragraph03
	$("#buttonHtml03").click(function() {
		$('#Div01').load("source/source.html #paragraph03", function() {
			console.log("Load source03 was performed");
			return true;
		});
	});

	//button that calls getData President01
	$("#buttonJson01").click(function() {
		$.getJSON('js/index.json', function(data) {
			var result = "<p>President: " + data[0].firstName + " " + data[0].lastName + "</p>";
			$("#Div02").html(result);
			console.log("Load Json01 was performed");
			return true;
		});
	});

	//button that calls getData President02
	$("#buttonJson02").click(function() {
		$.getJSON('js/index.json', function(data) {
			var result = "<p>President: " + data[1].firstName + " " + data[1].lastName + "</p>";
			$("#Div02").html(result);
			console.log("Load Json02 was performed");
			return true;
		});
	});
	//button that calls getData President03
	$("#buttonJson03").click(function() {
		$.getJSON('js/index.json', function(data) {
			var result = "<p>President: " + data[2].firstName + " " + data[2].lastName + "</p>";
			$("#Div02").html(result);
			console.log("Load Json03 was performed");
			return true;
		});
	});

	//this.getHtml = function() {
	this.getHtml = function(i) {'use strict';
		// uses JQuery .load() depending on index button selected
		// couldn't get this function to work with passing a parameter
		if (i === 1) {
			// loads paragraph01
			$('#Div01').load("source/source.html #paragraph01", function() {
				console.log("Load source01 was performed");
				return true;
			});
		} else if (i === 2) {
			// loads paragraph02
			$('#Div01').load("source/source.html #paragraph02", function() {
				console.log("Load source02 was performed");
				return true;
			});
		} else if (i === 3) {
			// loads paragraph03
			$('#Div01').load("source/source.html #paragraph03", function() {
				console.log("Load source03 was performed");
				return true;
			});
		} else {
			return false;
		}
		;
	};
	
	//this.getData = function(i) {
	function getData(i) {'use strict';
		// gets from [] in json file, calls a function to update the HTML file
		// couldn't get it to work with a passed parameter
		if (i < data.length) {
			$.getJSON('js/index.json', function(data) {
				var result = "<p>President: " + data[i].firstName + " " + data[i].lastName + "</p>";
				$("#Div02").html(result);
			}).success(function() {
				console.log("csc: success. Loaded index.json");
				return true;
			}).error(function(jqXHR, textStatus, errorThrown) {
				showError(jqXHR, textStatus, errorThrown);
				return false;
			}).complete(function() {
				console.log("csc: completed call to get index.json");
			});
		};
	};
}


/*  $(document).ready(function() {
	MyData();
}); */
