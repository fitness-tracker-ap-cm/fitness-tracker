/* eslint-disable no-useless-catch */
const express = require("express");
const router = express.Router();
const { PasswordTooShortError,UserTakenError,UserDoesNotExistError } = require('../errors');
const { createUser,getUserByUsername} = require('../db');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");


// POST /api/users/register
router.post('/register', async (req, res, next) => {
    const { username, password}  = req.body;
    try{
      // request must have both
      if (!username || !password) {
        next({
           message: "MissingCredentialsError",
           name: "MissingCredentialsError",
        });
      }
      const _user = await getUserByUsername(username);
      if (_user) {
            next({message: UserTakenError(username),
            name:'UserTakenError',
            error:'Error' });
     } 
     if (password.length < 9) {
        next({
            message: PasswordTooShortError(),
            name: "PasswordTooShortError",
            error: "PasswordTooShortError"
        });
     }
     
     const user = await createUser({ username, password});
     const token = jwt.sign({ id: user.id, username}, process.env.JWT_SECRET, {expiresIn: '1w'});

     res.send({
       token: token,
       message: "Thank you for signing up",
       user: user,
       id: user.id,
       username: user.userName,
     });

    }
    catch(error)
    {
        next(error);
    }

});

// POST /api/users/login
router.post('./login',async (req, res, next) =>{
    const { username, password } = req.body;
// request must have both
if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
      error: "MissingCredentialsError"
    });

    try{
        const user = await getUserByUsername(username);
        

         if (user && user.password == password) {
            const match = await bcrypt.compare(password, user.password);
            if(match){
                 // create token & return to user
                const token = jwt.sign({ id: user.id, username: user.username, password : user.password}, process.env.JWT_SECRET);
        
            const decodedFromToken = jwt.verify(token, JWT_SECRET);
            res.send({message: "you're logged in!" });
            }
            else
            {
                next({
                    message: 'Invalid Password',
                    name : 'Invalid Password',
                    error : 'Invalid Password'
                });
            }
         } 
         else{
            next({
                message: UserDoesNotExistError(username),
                name : 'UserDoesNotExistError',
                error : 'UserDoesNotExistError'
            });
         }

    }
    catch(error)
    {
        next(error);
    }
  }


});

// GET /api/users/me

// GET /api/users/:username/routines

module.exports = router;
