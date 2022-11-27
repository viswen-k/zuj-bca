import request from 'supertest';

const baseURL = 'http://localhost:8181';

describe('GET /api/fixtures/list', () => {
  it('should return 200', async () => {
    const response = await request(baseURL).get('/api/fixtures/list');
    expect(response.statusCode).toBe(200);
  });

  it('should return 10 fixtures', async () => {
    const response = await request(baseURL).get('/api/fixtures/list');
    expect(response.body.result.meta.count === 10).toBe(true);
  });
});
