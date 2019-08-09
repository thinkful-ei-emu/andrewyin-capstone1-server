const knex = require('knex');
const app = require('../src/app');

const voxMachina = require('../src/store');

describe('GET /api/characters', () => {
  context('given there is data', () => {
    it('responds with 200 and a list of characters', () => {
      return supertest(app)
        .get('/api/characters')
        .expect(200, voxMachina);
    });

    it('responds with the specified character', () => {
      return supertest(app)
        .get('/api/characters/1')
        .expect(200, voxMachina[0]);
    });
  });
});

describe('POST /api/characters/create', () => {
  const vM = [...voxMachina];
  it('should add the character to the list', async () => {
    const taryon = {
      charName: 'Taryon',
      charRace: 'Human',
      charClass: 'Artificer',
      charDesc: 'A human artficer who joined Vox Machina for a short duration.'
    };
    await supertest(app)
      .post('/api/characters/create')
      .send(taryon)
      .expect(201, taryon);

    return supertest(app)
      .get('/api/characters')
      .expect(200, [
        ...vM,
        {
          id: (vM.length+1),
          ...taryon
        }
      ]);
  });
});