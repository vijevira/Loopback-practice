let loopback= require('loopback');
module.exports = function(server) {
    let usermodel= loopback.findModel('User');
    //console.log(usermodel.properties);
    usermodel.defineProperty('role', {
        type: 'string', 'required': true
    });
    
}