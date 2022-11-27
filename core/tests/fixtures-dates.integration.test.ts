import request from 'supertest';

const baseURL = 'http://localhost:8181';

describe('GET /api/fixtures/dates', () => {
  const datesBody = {
    month: 11,
    year: 2022,
  };

  it('should return 200', async () => {
    const response = await request(baseURL).get('/api/fixtures/dates').send(datesBody);
    expect(response.statusCode).toBe(200);
  });

  it('should return 27-11-2022 as 3rd date of fixtures', async () => {
    const response = await request(baseURL).get('/api/fixtures/dates').send(datesBody);
    expect(response.body.result[2].date === '27-11-2022').toBe(true);
  });
});
