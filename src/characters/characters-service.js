const xss = require('xss');

const table = 'characters';

const CharactersService = {
  getAllCharacters(db, userId) {
    return db(table)
      .select('*')
      .where({ userId });
  },
  getCharacter(db, charId) {
    return db(table)
      .select('*')
      .where({ charId })
      .first();
  },
  addCharacter(db, char) {
    return db(table)
      .insert(char)
      .returning('*');
  },
  updateCharacter(db, charId, newInfo) {
    return db(table)
      .where({ charId })
      .update(newInfo);
  },
  deleteCharacter(db, charId) {
    return db(table)
      .where({ charId })
      .del();
  }
};

module.exports = CharactersService;