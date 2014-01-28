/**
 * @author chelsa.hiatt
 * This javaScript file is to maintain the convert functionality for the application.
 * Created: January 27, 2014
 * PROG 272 - Winter 2014
 */

var userForm = {

	degree : document.getElementById("farenheit"),
	distance : document.getElementById("miles"),
	number : document.getElementById("number"),
	
	celcius : function() {'use strict';
		// Deduct 32, then multiply by 5, then divide by 9
		return ((this.degree - 32) * 5) / 9;
	},
	kilometers : function() {'use strict';
		// km =  miles/0.62137
		return (this.distance / 0.62137);
	},
	sqr : function() {'use strict';
		// math to sq root
		return Math.sqroot(this.number);
	}
};

function convert(){
	'use strict';
	if(userForm.degree!==""){
		document.getElementById("celsius").innerHTML = userForm.celcius;
	};
	if(userForm.distance !== ""){
		document.getElementById("kilometers").innerHTML = userForm.kilometers;
	};
	if(userForm.number !== ""){
		document.getElementById("sqroot").innerHTML = userForm.sqr;
	};
};