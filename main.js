var pgp = require('pg-promise')();

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
  console.log('OH NO', err);
  process.exit(-1);
});
