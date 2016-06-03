# postgres-session-user

This will work if you run:
 - `npm install`
 - `node main`
 
Locally (with PostgreSQL installed), but it will fail on TravisCI:
 
![build status](https://travis-ci.org/SCdF/postgres-session-user.svg?branch=master)

^-- the error in [the build](https://travis-ci.org/SCdF/postgres-session-user/builds/135073294) is:

```
[error: syntax error at or near "session_user"]
```

Which implies that it doesn't understand what `session_user` is, or that for some reason it doesn't like using this function in this situation.

Note that the output we can run that function as just a `select` and it works fine, and we can also set an explicit role.

`current_user` also fails as `session_user` does, and there presumably may be others.
