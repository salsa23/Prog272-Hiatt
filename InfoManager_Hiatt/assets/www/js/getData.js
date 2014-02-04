/**
 * @author Chelsa Hiatt
 * version 3.0
 * Date: 2/3/14
 */

/*jslint devel: true, evil: true, white: true */

function MyData() {'use strict';
	//button that calls getHtml Paragraph01
	$("#buttonHtml01").click(function() {
		MyData.getHtml(1);
		//$('#Div01').load("source/source.html #paragraph01", function() {
		//	console.log("Load source01 was performed");
		//	return true;
		//});
	});

	//button that calls getHtml Paragraph02
	$("#buttonHtml02").click(function() {
		getHtml(2);
		//$('#Div01').load("source/source.html #paragraph02", function() {
		//	console.log("Load source02 was performed");
		//	return true;
		//});
	});

	//button that calls getHtml Paragraph03
	$("#buttonHtml03").click(function() {
		getHtml(3);
		//$('#Div01').load("source/source.html #paragraph03", function() {
		//	console.log("Load source03 was performed");
		//	return true;
		//});
	});

	//button that calls getData President01
	$("#buttonJson01").click(function() {
		getData(1);
		//$.getJSON('js/index.json', function(data) {
		//	var result = "<p>President: " + data[0].firstName + " " + data[0].lastName + "</p>";
		//	$("#Div02").html(result);
		//	console.log("Load Json01 was performed");
		//	return true;
		//});
	});

	//button that calls getData President02
	$("#buttonJson02").click(function() {
		getData(2);
		//$.getJSON('js/index.json', function(data) {
		//	var result = "<p>President: " + data[1].firstName + " " + data[1].lastName + "</p>";
		//	$("#Div02").html(result);
		//	console.log("Load Json02 was performed");
		//	return true;
		//});
	});

	//button that calls getData President03
	$("#buttonJson03").click(function() {
		getData(3);
		//$.getJSON('js/index.json', function(data) {
		//	var result = "<p>President: " + data[2].firstName + " " + data[2].lastName + "</p>";
		//	$("#Div02").html(result);
		//	console.log("Load Json03 was performed");
		//	return true;
		//});
	});

	// uses JQuery .load() depending on index button selected
	this.getHtml = function(i) {
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
	};

	// gets from [] in json file, calls a function to update the HTML file
	this.getData = function(i) {

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
}


$(document).ready(function() {'use strict';
	new MyData();
});
