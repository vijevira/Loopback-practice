let loopback = require('loopback');
module.exports = function(app) {
  let usermodel= loopback.findModel('User');
    //console.log(Object.keys(usermodel.definition.settings.acls).sort());
    //usermodel.definition.settings.acls[0].permission = 'ALLOW';
    var User = app.models.User;
    let ACL= app.models.ACL;
    ACL.create({
      "model": "User",
      "property": "*",
      "accessType": "READ",
      "permission": "ALLOW",
      "principalType": "ROLE",
      "principalId": "$authenticated"
    }, function(err, userInstance) {
      console.log(userInstance);
    });
    User.create({email: 'foo@bar.com', password: 'bar'}, function(err, userInstance) {
      console.log(userInstance);
    });
}