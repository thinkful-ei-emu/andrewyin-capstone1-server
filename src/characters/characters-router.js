const express = require('express');
const CharactersService = require('./characters-service');

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
  .get(async (req, res, next) => {
  // .get((req, res, next) => {
    const db = req.app.get('db');
    try {
      const characters = await CharactersService.getAllCharacters(db);
      // const characters = CharactersService.getAllCharacters('db');

      return res.json(characters);
    }
    catch (e) {
      console.error(e.message);
      next();
    }
  });

charactersRouter
  .route('/:character_id')
  .get(checkCharacterExists, (req, res) => {
    return res.json(res.character);
  });

charactersRouter
  .route('/create')
  .post(jsonBodyParser, async (req, res, next) => {
    const db = req.app.get('db');

    const { charName, charRace, charClass, charDesc } = req.body;
    const newChar = { charName, charRace, charClass, charDesc };

    // console.log('post', req.body);

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
      console.log('did not find character');
      return res.status(404)
        .json(charNotFoundError);
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