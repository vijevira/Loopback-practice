let amqp = require('amqplib/callback_api');
// let channel = {};

module.exports = function (app) {
  let mqHost = process.env.MQ_HOST || '10.73.96.81';
  let mqPort = process.env.MQ_PORT || '5676';
  let mqUserName = process.env.MQ_USERNAME || 'guest';
  let mqPassword = process.env.MQ_PASSWORD || 'guest';
  let mqVhost = process.env.MQ_VHOST || '%2f';

  let server = 'amqp://' + mqUserName + ':' + mqPassword + '@' + mqHost + ':' + mqPort;
  setTimeout(() => {
    amqp.connect(server, function (err, conn) {
      if (err) {
        console.log('Error in connecting to amqp Server', err);
      } else {
        conn.createChannel(function (err, ch) {
          if (err) {
            console.log('Error in creating channel', err);
          } else {
            console.log('AMQP server connected');
          }
          module.exports.channel = ch;
          app.set('ch', ch);
          app.emit('channel-connected', ch);
        });
      }
    });
  }, process.env.QTIMEOUT || 5000);
};
