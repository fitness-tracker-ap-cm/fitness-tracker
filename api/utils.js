const { UnauthorizedError} = require("../errors");

function requireUser(req,res, next) {
  //Check if there is a user logged in
  if (!req.user) {
    res.status(401);
    next({
      message: UnauthorizedError(),
        name: "UnauthorizedError",
        error: "UnauthorizedError"
    });
  }
  next();
}

module.exports = { requireUser };
