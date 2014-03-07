var topics = {};

// extending JQuery with custom code that allows our code to use $.Topic in other modules
jQuery.Topic = function( id ) {
    
    var callbacks,
        topic = id && topics[ id ];
        
    if ( !topic ) {
        callbacks = jQuery.Callbacks();
        topic = {
            publish: callbacks.fire,
            subscribe: callbacks.add,
            unsubscribe: callbacks.remove
        };
        
        if ( id ) {
            topics[ id ] = topic;
        }
    }
    
    return topic;
};
