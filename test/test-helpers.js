const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const voxMachina = require('../src/store');

function makeCharactersArray() {
  return [
    ...voxMachina
  ];
}

function makeUsersArray() {
  return [
    {
      userName: 'mmercer',
      fullName: 'Matt Mercer',
      nickname: 'DM',
      password: 'howdoyouwanttodothis'
    },
    {
      userName: 'voxMachina',
      fullName: 'Vox Machina',
      nickname: 'VM',
      password: 'codenamecriticalrole'
    }
  ];
}

function makeActualCharactersArray(characters) {
  return characters.map(character => {
    const { charName, charRace, charClass, charDesc } = character;
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
      characters,
      dnd_users
      RESTART IDENTITY CASCADE;`
  );
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  // const token = Buffer.from(`${user.user_name}:${user.password}`).toString('base64');
  const token = jwt.sign({ userId: user.userId }, secret, {
    subject: user.userName,
    algorithm: 'HS256'
  });
  return `bearer ${token}`;
}

async function seedCharactersTable(db, characters = []) {
  return db('characters')
    .insert(characters);
}

async function seedUsers(db, users) {
  const preppedUsers = users.map(({ password, ...user }) => {
    return {
      ...user,
      password: bcrypt.hashSync(password, 1)
    };
  });

  await db('dnd_users')
    .insert(preppedUsers);

  db.raw(
    'SELECT setval(\'dnd_users_id_seq\', ?)',
    [users[users.length - 1].id]
  );
}

module.exports = {
  makeActualCharactersArray,
  makeActualCharacter,

  makeDnDFixtures,
  makeAuthHeader,
  seedCharactersTable,
  seedUsers,
  cleanTables
};