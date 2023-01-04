let multer = require('multer');
let fs = require('fs');

module.exports = function (Todolist) {

  Todolist.greet = function (cb) {
    let response = { "active": "cc1", "inactive": "cc2" };
    console.log('greet function');
    cb(null, response);
  }

  Todolist.remoteMethod('greet', {
    http: { path: "/greet", verb: 'get' },
    returns: { arg: 'output', type: 'string' }
  });
  Todolist.beforeRemote('greet', function (context, user, next) {
    console.log("got in before remote");
    next();
  });
  Todolist.afterRemote('greet', function (context, remoteMethodOutput, next) {
    console.log("got in after remote");
    next();
  });
  Todolist.afterRemoteError('greet', function (context, next) {
    console.log("got in after remote error");
    next();
  });


  Todolist.greet = function (msg, cb) {
    cb(null, 'Greetings... ' + msg);
  }

  Todolist.remoteMethod('greet', {
    accepts: { arg: 'msg', type: 'string' },
    returns: { arg: 'greeting', type: 'string' }
  });
  
  



};
