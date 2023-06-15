module.exports = {
  httpRequestTimeout: 120000,
  editorTheme: {
    projects: {
      enabled: false
    }
  },
  projectsDir: 'nodered/',
  httpAdminRoot: '/red',
  httpNodeRoot: '/redapi',
  userDir: __dirname + '/../nodered',
  nodesDir: __dirname + '/../nodes',
  flowFilePretty: true,
  credentialSecret: 'my-random-string',
  functionGlobalContext: {
    loopback: require('loopback'),
    logger: require('oe-logger')('node-red-flow')
  }
};
