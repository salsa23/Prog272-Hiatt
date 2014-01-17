/**
 * @author chelsa.hiatt
 */

var foo = {
        firstName: 'Able',
        lastName: 'Thomas',
        func: function() {
                console.log('func called: ' + this.firstName);                
        }
};

foo.func();