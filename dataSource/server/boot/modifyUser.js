let loopback= require('loopback');
module.exports = function(server) {
    let usermodel= loopback.findModel('User');
    usermodel.settings.acls[0].permission = 'ALLOW';
    
    Object.keys(usermodel.settings.acls[0]).sort().forEach(element => {
        console.log(element);
    });
    console.log(usermodel.settings.acls[0]);
}