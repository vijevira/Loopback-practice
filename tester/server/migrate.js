let app = require('oe-cloud');

app.boot(app.options, function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  let m = require('oe-migration');

  m.migrate({}, (err, _oldDbVersion, _migratedVersions) => {
    if (err) {
      console.log(err);
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
});
