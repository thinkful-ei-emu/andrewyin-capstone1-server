const voxMachina = require('../src/store');

function makeCharactersArray() {
  return [
    ...voxMachina
  ];
}

function makeUsersArray() {
  return [

  ];
}

function makeActualCharactersArray(characters) {
  return characters.map(character => {
    const {charName, charRace, charClass, charDesc} = character;
    return {
      charName,
      charRace,
      charClass,
      charDesc,
    };
  });
}

function makeActualCharacter(character) {
  return {
    charName: character.charName,
    charRace: character.charRace,
    charClass: character.charClass,
    charDesc: character.charDesc
  };
}

function makeDnDFixtures() {
  return {
    testUsers: makeUsersArray(),
    testCharacters: makeCharactersArray()
  };
}

function cleanTables(db) {
  return db.raw(
    `TRUNCATE
      characters
      RESTART IDENTITY CASCADE;`
  );
}

async function seedCharactersTable(db, characters = []) {
  return db('characters')
    .insert(characters);
}

module.exports = {
  makeActualCharactersArray,
  makeActualCharacter,

  makeDnDFixtures,
  seedCharactersTable,
  cleanTables
};