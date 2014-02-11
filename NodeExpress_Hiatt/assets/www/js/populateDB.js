/**
 * @author Salsa
 */

// private function that creates db
function writeJson() {
	var addresses = [];
	// fill the data array
	for (var i = 10000; i < 10251; i = i + 1) {
		var person = {
			firstName : 'Rita' + i,
			lastName : 'Hill' + i,
			address : i + " " + "Ruby Street",
			city : 'Bellevue',
			state : 'WA',
			zip : '98002'
		};
		data.push(person);
	}

	$.ajax({
		type : 'GET',
		url : '/write',
		dataType : 'json',
		data : addresses,
		success : function(data) {
			showDebug(data.result);
		},
		error : showError
	});
};

writeJson();
