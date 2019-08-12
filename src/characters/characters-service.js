const xss = require('xss');

const table = 'characters';

const CharactersService = {
  getAllCharacters(db) {
    return db(table)
      .select('*');
  },
  getCharacter(db, charId) {
    return db(table)
      .select('*')
      .where({ charId })
      .first();
  },
  async addCharacter(db, char) {
    const [newChar] = await db(table)
      .insert(char)
      .returning('*');
    return newChar;
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