const xss = require('xss');

const VoxMachina = require('../store');

const CharactersService = {
  getAllCharacters(db) {
    return [...VoxMachina];
  },
  getCharacter(db, charId) {
    return VoxMachina.find(char => char.id === charId);
  },
  addCharacter(db, char) {
    const newChar = {
      id: `${VoxMachina.length+1}`,
      ...char
    };
    console.log(newChar);
    VoxMachina.push(newChar);

    return char;
  }
};

module.exports = CharactersService;