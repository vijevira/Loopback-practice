let app = require('../../server/server');

module.exports = function (RED) {
  function sendMsg(config) {
    RED.nodes.createNode(this, config);

    this.q = config.messageQueue;

    let node = this;

    node.on('input', function (msg) {
      let q = node.q;
      const ch = app.get('ch');
      ch.assertQueue(q, { durable: true });
      ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)), { persistent: true });
    });
  }

  RED.nodes.registerType('send-message', sendMsg);
};
