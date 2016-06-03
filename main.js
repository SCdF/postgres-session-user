var pgp = require('pg-promise')(),
    pg = require('pg');

var db = pgp({
  host: 'localhost',
  port: 5432
});

db.query('SELECT session_user, current_user')
.then(function(results) {
  console.log(results);

  console.log('Create table succeeded');
  return db.query('CREATE TABLE foo (bar int)');
}).then(function() {
  console.log('Create role');
  return db.query('CREATE ROLE test_role');
}).then(function() {
  console.log('Alter table to hard-coded role');
  return db.query('ALTER TABLE foo OWNER TO test_role');
}).then(function() {
  console.log('Alter table to session_user');
  return db.query('ALTER TABLE foo OWNER TO session_user');
})
.then(function() {
  console.log('Done!');
  process.exit(0);
})
.catch(function(err) {
  console.error('OH NO', err);

  console.log('Let\'s try with another library');
  var client = new pg.Client('postgres://localhost:5432');
  client.connect(function(err) {
    if (err) {
      return console.error('blast!', err);
    }

    client.query('ALTER TABLE foo OWNER TO session_user', function(err, result) {
      if (err) {
        console.error('This one didn\'t work either', err);
        process.exit(-1);
      }

      console.log('This one worked!');
      process.exit(-1);
    });
  });
});
