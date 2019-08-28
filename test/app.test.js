'use strict';
/*global supertest */

const app = require('../src/app');

describe('App', () => {
  it('GET / responds with status 200', () => {
    return supertest(app)
      .get('/')
      .expect(404);
  });
});
