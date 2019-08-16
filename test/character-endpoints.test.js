const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
// const testCharacters = require('../src/store');

describe('Character Endpoints', function () {
  let db;

  const {
    testUsers,
    testCharacters
  } = helpers.makeDnDFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });

    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  describe('GET /api/characters', () => {
    context('given there is data', () => {
      beforeEach('insert characters', async () => {
        const seedUser = await helpers.seedUsers(
          db,
          testUsers
        );
        const seedChar = await helpers.seedCharactersTable(
          db,
          testCharacters
        );

        return Promise.all([seedUser, seedChar]);
      });

      it('responds with 200 and a list of characters', async () => {
        const res = await supertest(app)
          .get('/api/characters')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200);

        res.body.forEach((actualCharacter, index) => {
          const testChar = {
            charId: index + 1,
            ...testCharacters[index]
          };

          expect(actualCharacter.charId).to.equal(testChar.charId);
          expect(actualCharacter.charName).to.equal(testChar.charName);
          expect(actualCharacter.charRace).to.equal(testChar.charRace);
          expect(actualCharacter.charClass).to.equal(testChar.charClass);
          expect(actualCharacter.charDesc).to.equal(testChar.charDesc);
        });
      });

      it('responds with the specified character', async () => {
        const testChar = {
          charId: 1,
          ...testCharacters[0]
        };

        const res = await supertest(app)
          .get('/api/characters/1')
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200);
        const actualCharacter = res.body;

        expect(actualCharacter.charId).to.equal(testChar.charId);
        expect(actualCharacter.charName).to.equal(testChar.charName);
        expect(actualCharacter.charRace).to.equal(testChar.charRace);
        expect(actualCharacter.charClass).to.equal(testChar.charClass);
        expect(actualCharacter.charDesc).to.equal(testChar.charDesc);
      });
    });

    describe('POST /api/characters/create', () => {
      beforeEach('insert characters', async () => {
        const seedUser = await helpers.seedUsers(
          db,
          testUsers
        );
        const seedChar = await helpers.seedCharactersTable(
          db,
          testCharacters
        );

        return Promise.all([seedUser, seedChar]);
      });


      it('should add the character to the list', async () => {
        const taryon = {
          charName: 'Taryon',
          charRace: 'Human',
          charClass: 'Artificer',
          charDesc: 'A human artficer who joined Vox Machina for a short duration.'
        };
        const res = await supertest(app)
          .post('/api/characters/create')
          .set('Authorization', helpers.makeAuthHeader(testUsers[1]))
          .send(taryon)
          .expect(201);

        const [newChar] = res.body;

        expect(newChar.charId).to.equal(testCharacters.length + 1);
        expect(newChar.charName).to.equal(taryon.charName);
        expect(newChar.charRace).to.equal(taryon.charRace);
        expect(newChar.charClass).to.equal(taryon.charClass);
        expect(newChar.charDesc).to.equal(taryon.charDesc);
      });
    });
  });

});