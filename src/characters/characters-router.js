const express = require('express');
const CharactersService = require('./characters-service');
const { requireAuth } = require('../auth/jwt-auth');

// const CharacterController = require('./character-controller');

const charactersRouter = express.Router();
const jsonBodyParser = express.json();

// dummy db

const charNotFoundError = {
  error: 'character not found'
};

function missingValueError(key) {
  return {
    error: `missing ${key} in request body`
  };
}

charactersRouter
  .route('/')
  .all(requireAuth)
  .get(async (req, res, next) => {
    const db = req.app.get('db');
    try {
      const characters = await CharactersService.getAllCharacters(db, req.user.userId);

      return res.json(characters);
    }
    catch (e) {
      console.error(e.message);
      next();
    }
  });

charactersRouter
  .route('/:character_id')
  .all(requireAuth)
  .all(checkCharacterExists)
  .get((req, res) => {
    return res.json(res.character);
  });

charactersRouter
  .route('/create')
  .all(requireAuth)
  .all(jsonBodyParser)
  .post(async (req, res, next) => {
    const db = req.app.get('db');

    const { charName, charRace, charClass, charDesc } = req.body;
    const newChar = { 
      charName, 
      charRace, 
      charClass, 
      charDesc, 
      userId: req.user.userId };

    for (const [key, value] of Object.entries(newChar)) {
      if (!value) {
        return res.status(400)
          .json(missingValueError(key));
      }
    }

    try {
      const character = await CharactersService.addCharacter(db, newChar);

      return res.status(201).send(character);
    }
    catch (e) {
      console.error(e.message);
      next();
    }
  });

async function checkCharacterExists(req, res, next) {
  try {
    const db = req.app.get('db');
    const character = await CharactersService.getCharacter(
      db,
      req.params.character_id
    );

    // console.log('CHAR ID', req.params.character_id);

    if (!character) {
      return res.status(404)
        .json(charNotFoundError);
    }
    if (req.user.userId !== character.userId) {
      return res.status(401).end();
    }

    res.character = character;
    next();
  }
  catch (e) {
    console.error(e.message);
    next();
  }
}

module.exports = charactersRouter;