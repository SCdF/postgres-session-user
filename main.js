var pgp = require('pg-promise')(),
    pg = require('pg');

var TABLE = "psu_test_table";
var ROLE =  "psu_test_role";

var POSTGRES_CONNECTION_STRING = 'postgres://localhost:5432';

var db = pgp(POSTGRES_CONNECTION_STRING);

// First just some quick prep to make sure it can be re-run locally
db.query('DROP TABLE IF EXISTS ' + TABLE)
.then(function() {
  return db.query('DROP ROLE IF EXISTS ' + ROLE);
}).then(function() {
  return db.query('SELECT session_user, current_user')
}).then(function(results) {
  console.log(results);

  console.log('Create table succeeded');
  return db.query('CREATE TABLE ' + TABLE + ' (bar int)');
}).then(function() {
  console.log('Create role');
  return db.query('CREATE ROLE ' + ROLE);
}).then(function() {
  console.log('Alter table to hard-coded role');
  return db.query('ALTER TABLE ' + TABLE + ' OWNER TO ' + ROLE);
}).then(function() {
  console.log('Alter table to session_user');
  return db.query('ALTER TABLE ' + TABLE + ' OWNER TO session_user');
})
.then(function() {
  console.log('Done!');
  process.exit(0);
})
.catch(function(err) {
  console.error('OH NO', err);

  console.log('Let\'s try with another library');
  var client = new pg.Client(POSTGRES_CONNECTION_STRING);
  client.connect(function(err) {
    if (err) {
      return console.error('blast!', err);
    }

    client.query('ALTER TABLE ' + TABLE + ' OWNER TO session_user', function(err, result) {
      if (err) {
        console.error('This one didn\'t work either', err);
        process.exit(-1);
      }

      console.log('This one worked!');
      process.exit(-1);
    });
  });
});
