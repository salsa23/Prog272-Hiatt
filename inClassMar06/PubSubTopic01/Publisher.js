/**
 * @author Charlie Calvert
 */

// Publisher
PubSub.Publisher = ( function() {		

		function Publisher() {
			// calls subscriber constructor
			new PubSub.Subscriber();
			// button click to publish other message
			$("#privateButton").click(privateMethod);
			// publish a message called 'debug' (topic is a class we created to provide SubPub services
			$.Topic('debug').publish('Publisher constructor Called');
		}
		
		var privateMethod = function() {
			$.Topic('debugDetail').publish('Publisher privateMethod called by Pub Sub');
		};

		return Publisher;

	}());

$(document).ready(function() {
	new PubSub.Publisher();
});

