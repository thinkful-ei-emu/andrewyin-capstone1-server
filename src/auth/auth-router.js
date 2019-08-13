const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
  .post('/login', jsonBodyParser, async (req, res, next) => {
    const { userName, password } = req.body;
    const loginUser = { userName, password };

    const invalidLoginError = {
      error: 'invalid login'
    };

    for (const key in loginUser) {
      if (!loginUser[key])
        return res.status(400)
          .json({ error: `missing ${key}` });
    }

    try {
      const dbUser = await AuthService.getUserByUserName(req.app.get('db'), loginUser.userName);
      if (!dbUser) {
        console.log('user not found');
        return res.status(400)
          .json(invalidLoginError);
      }

      const compareMatch = await AuthService.comparePasswords(loginUser.password, dbUser.password);
      if (!compareMatch) {
        console.log('password incorrect');
        return res.status(400)
          .json(invalidLoginError);
      }

      const sub = dbUser.userName;
      const payload = { userId: dbUser.userId };
      const authToken = await AuthService.createJWT(sub, payload);
      console.log(authToken);
      res.send({
        authToken 
      });
    }
    catch (e) {
      console.log(e);
      next();
    }
  });

module.exports = authRouter;