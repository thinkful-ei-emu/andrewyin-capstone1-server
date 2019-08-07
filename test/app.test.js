const app = require('../src/app');

describe('App Test', () => {
  it('should return hello world', () => {
    return supertest(app)
      .get('/')
      .expect(200, 'Hello, world!');
  });
});