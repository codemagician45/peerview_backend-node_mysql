### PEERVIEW
Application based for university students. Sharing of learning experiences, find upconming rave, find local jobs and events.

#### Api Implementation
Basically this setup is primarily for the api implementation; and its requirements to run and api/back-end.

1. `npm install` - this would install dependencies and dev-dependencies.
2. `npm run add-hooks` - this would make the staged files to be checked before we can commit the changes;
thus linting our js files for coding styles and standards.
3. `NODE_ENV=development npm run start` - running the application in the config of the development stage.
This would primarily get the configuration under `config/development`.

* Other command usage
	* `npm run db-sync` - this would sync the latest db table and creates empty tables.
    Basically you need to have existing database name before doing so.
	* `npm run lint-check` - manually lints our js files for coding styles and standards.


#### Note
1. Promise [Error](http://goo.gl/rRqMUw)
```
 function findUser (req, res, next) {
  let passwordResetToken = req.$params.passwordResetToken;
  return req.db.user.findOne({
    where: {
      [req.Op.and]: {
        passwordResetToken: passwordResetToken,
        tokenActiveDate: {
          [req.Op.gte]: moment(new Date())
        }
      }
    }
  })
  .then(user => {
    if (!user) {
      return res.status(400).send({
        status: 'ERROR',
        status_code: 102,
        status_message: 'Password reset token has been expired',
        http_code: 400
      });
    }

    return next();
    /**
     * This would a return coming from the top then
     * so that we can eliminate this error
     * http://goo.gl/rRqMUw
     */
    return user;
  })
  .catch(error => {
    res.status(500)
    .send(new rpc.InternalError(error));

    req.log.error({
      err: error
    }, 'user.findOne Error - post-set-new-password');
  });
}
```
Thus we have to return the current result set in every query to avoid Promise warning.
