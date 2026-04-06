const request = require('supertest');
const app = require('../src/server');

describe('health route', () => {
  it('returns api metadata', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body.author).toBe('Suraj Yadav');
  });
});
