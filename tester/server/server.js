let app = module.exports = require('oe-cloud');
let options = app.options;
let logger = require('oe-logger')('server');

process.env.DISABLE_EVENT_HISTORY = true;

app.boot(options, function (bootErr) {
  if(bootErr) {
    logger.warn('Erroe while boot: ', bootErr);
  }
  app.start();
});

app.once('started', () => {
  console.log('App started...');
});

process.on('uncaughtException', function (err) {
  console.log('uncaughtException : ', err);
});
