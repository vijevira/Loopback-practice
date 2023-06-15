let app = require('../../server/server');

module.exports = function (RED) {
  function getMsg(config) {
    RED.nodes.createNode(this, config);
    this.q = config.messageQueue;
    let node = this;

    let q = node.q;
    const ch = app.get('ch');
    if (!ch) {
      app.once('channel-connected', (ch) => {
        ch.assertQueue(q, { durable: true });
        ch.prefetch(app.get('rabbitMqPrefetch') || 100);
        ch.consume(q, function (msg) {
          let jsonMsgObj = {
            'payload': JSON.parse(msg.content.toString())
          };

          if (!jsonMsgObj.callContext) {
            jsonMsgObj.callContext = RED.util.cloneMessage(config.callContext);
          }
          jsonMsgObj.deliveryTag = {
            'fields': {
              deliveryTag: RED.util.cloneMessage(msg.fields.deliveryTag)
            }
          };

          node.send(jsonMsgObj);
        }, { noAck: false });
      });
    } else {
      ch.assertQueue(q, { durable: true });
      ch.prefetch(app.get('rabbitMqPrefetch') || 100);
      ch.consume(q, function (msg) {
        let jsonMsgObj = {
          'payload': JSON.parse(msg.content.toString())
        };

        if (!jsonMsgObj.callContext) {
          jsonMsgObj.callContext = RED.util.cloneMessage(config.callContext);
        }
        jsonMsgObj.deliveryTag = {
          'fields': {
            deliveryTag: RED.util.cloneMessage(msg.fields.deliveryTag)
          }
        };

        node.send(jsonMsgObj);
      }, { noAck: false });
    }
  }

  RED.nodes.registerType('receive-message', getMsg);
};
