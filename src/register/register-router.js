const express = require('express');
const RegisterService = require('./register-service');


const registerRouter = express();
const jsonBodyParser = express.json();

registerRouter
  .route('/')
  .post(jsonBodyParser, async (req, res, next) => {
    const db = req.app.get('db');
    const { userName, password, fullName } = req.body;
    if (!userName) return res.status(400).json({
      error: 'missing username'
    });
    if (!password) return res.status(400).json({
      error: 'missing password'
    });

    try {
      if (await RegisterService.hasUserWithUserName(db, userName)) {
        return res.status(400).json({
          error: 'username taken'
        });
      }
      const hashedPassword = await RegisterService.hashPassword(password);
      const newUser = {
        userName,
        password: hashedPassword,
        fullName
      };
      await RegisterService.insertUser(db, newUser);
      console.log('insert complete');
      return res.sendStatus(201);
    }
    catch (e) {
      next(e);
    }
  });

module.exports = registerRouter;