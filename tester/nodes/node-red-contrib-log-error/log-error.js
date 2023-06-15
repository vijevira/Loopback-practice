const loopback = require('loopback');
const logger = require('oe-logger')('LogError');

module.exports = function (RED) {
  function logError(config) {
    RED.nodes.createNode(this, config);
    let node = this;

    node.on('input', function (msg) {
      const errModel = loopback.findModel('FatalError');
      errModel.create({ 'error': msg }, config.callContext, (error, _response) => {
        if (error) {
          logger.fatal('Not able to log error into the Fatal DB............', msg);
        } else {
          node.send(msg);
        }
      });
    });
  }

  RED.nodes.registerType('log-error', logError);
};
