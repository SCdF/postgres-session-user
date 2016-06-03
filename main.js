var pgp = require('pg-promise')();

var db = pgp({
  host: 'localhost',
  port: 5432
});

db.query('SELECT session_user, current_user')
.then(function(result) {
  console.log(arguments);
  process.exit(0);
});
