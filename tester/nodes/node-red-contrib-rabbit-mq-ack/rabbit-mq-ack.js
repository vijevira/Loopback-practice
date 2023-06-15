let app = require('../../server/server');

module.exports = function (RED) {
  function ackRabbitMq(config) {
    RED.nodes.createNode(this, config);
    this.q = config.messageQueue;
    let node = this;

    let q = node.q;
    const ch = app.get('ch');
    if (ch) {
      ch.assertQueue(q, { durable: true });

      node.on('input', function (msg) {
        try {
          ch.ack(msg.deliveryTag);
        } catch (err) {
          node.error(err);
        }
      });
    } else {
      app.once('channel-connected', (ch) => {
        ch.assertQueue(q, { durable: true });

        node.on('input', function (msg) {
          try {
            ch.ack(msg.deliveryTag);
          } catch (err) {
            node.error(err);
          }
        });
      });
    }
  }
  RED.nodes.registerType('rabbit-mq-ack', ackRabbitMq);
};
