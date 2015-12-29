var debug = require('debug')('HelloWorld:checkout');

var vsocheckout = require('vsocheckout');

var url = 'localhost:3000/vsostatus';

vsocheckout.getStatus(url, 236, function(err, result){
    if (err) console.error(err);
    else {
        debug('got data to work with..');
        vsocheckout.checkout(result);
        
    }
    
    
});

