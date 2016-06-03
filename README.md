# postgres-session-user

This will work if you run:
 - `npm install`
 - `node main`
 
Locally (with PostgreSQL installed), but it will fail on TravisCI:
 
![build status](https://travis-ci.org/SCdF/postgres-session-user.svg?branch=master)

^-- the error in [the build](https://travis-ci.org/SCdF/postgres-session-user/builds/135078650) is:

```
[error: syntax error at or near "session_user"]
```

It tries with two different libraries just to be sure, both which fail:
 - https://github.com/vitaly-t/pg-promise
 - https://github.com/brianc/node-postgres

This implies that somehow the Travis CI postgres setup doesn't understand what `session_user` is, or that for some reason it doesn't like using this function in this situation.

Note from the linked build output that we can run the function just fine in a  `select`, and we can also set an explicit role. We just cannot set a role using that function.

NB: `current_user` also fails the same way, presumably there may be others.
