var pgp = require('pg-promise')();

var db = pgp({
  host: 'localhost',
  port: 5432
});

console.log('CT');
db.query('CREATE TABLE foo (bar int);')
.then(function() {
  console.log('AT');
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
