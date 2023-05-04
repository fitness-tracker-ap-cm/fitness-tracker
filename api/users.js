/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const {
  PasswordTooShortError,
  UserTakenError,
  UserDoesNotExistError,
  UnauthorizedError,
} = require("../errors");

const { createUser, getUserByUsername, getPublicRoutinesByUser, getAllRoutinesByUser } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const { requireUser } = require("./utils");

// POST /api/users/register
router.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    // request must have both
    if (!username || !password) {
      next({
        message: "MissingCredentialsError",
        name: "MissingCredentialsError",
      });
    }
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        message: UserTakenError(username),
        name: "UserTakenError",
        error: "Error",
      });
    }
    if (password.length < 9) {
      next({
        message: PasswordTooShortError(),
        name: "PasswordTooShortError",
        error: "PasswordTooShortError",
      });
    }

    const user = await createUser({ username, password });
    const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    res.send({
      token: token,
      message: "Thank you for signing up",
      user: user,
      id: user.id,
      username: user.userName,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  // request must have both
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
      error: "MissingCredentialsError",
    });
  }
  try {
    const user = await getUserByUsername(username);

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        // create token & return to user
        const token = jwt.sign(
          { id: user.id, username: user.username, password: user.password },
          process.env.JWT_SECRET
        );

        res.send({ token: token, user: user, message: "you're logged in!" });
      } else {
        next({
          message: "Invalid Password",
          name: "Invalid Password",
          error: "Invalid Password",
        });
      }
    } else {
      next({
        message: UserDoesNotExistError(username),
        name: "UserDoesNotExistError",
        error: "UserDoesNotExistError",
      });
    }
  } catch (error) {
    next(error);
  }
});

// GET /api/users/me
router.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:username/routines
router.get('/:username/routines', requireUser, async(req,res,next) => {
    const { username } = req.params;
  
    try{
        if(req.user && req.user.username === username) //if user is logged in and request their own routnes then display all of their Routines public and private
        {
            const userRoutines = await getAllRoutinesByUser({username});
            res.send(userRoutines); 
        }
        else //get only the public routines  for the requested username 
        {
           const publicRoutines = await getPublicRoutinesByUser({username});
           res.send(publicRoutines); 
        }
    }
    catch(error)
    {
        next(error);
    }
});

module.exports = router;


