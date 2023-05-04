const { UnauthorizedError} = require("../errors");

function requireUser(req, user, next) {
  //Check if there is a user logged in
  if (!req.user) {
    next({
      message: UnauthorizedError(),
        name: "UnauthorizedError",
        error: "UnauthorizedError"
    });
  }
  next();
}

module.exports = { requireUser };
