import request from 'supertest';
import app from '../src/app';
import { seedItems } from '../src/database/itemsDatabase';

describe('GET /api/items', () => {
  beforeAll(() => {
    seedItems();
  });

  it('returns the first 20 items by default', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(20);
    expect(res.body.items[0]).toEqual({ id: 1 });
    expect(res.body.lastId).toBe(20);
  });

  it('rejects an invalid lastId (400)', async () => {
    const res = await request(app).get('/api/items').query({ lastId: '-5' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('ValidationError');
  });

  it('rejects unknown query params (400)', async () => {
    const res = await request(app).get('/api/items').query({ foo: 'bar' });
    expect(res.status).toBe(400);
  });
});

describe('POST /api/items', () => {
  beforeAll(() => {
    seedItems();
  });

  it('creates an item with a string id (201)', async () => {
    const res = await request(app).post('/api/items').send({ id: 'api-test-id' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ id: 'api-test-id' });
  });

  it('rejects a missing id (400)', async () => {
    const res = await request(app).post('/api/items').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('ValidationError');
  });

  it('rejects extra fields (400)', async () => {
    const res = await request(app).post('/api/items').send({ id: 'x', extra: 1 });
    expect(res.status).toBe(400);
  });

  it('returns 409 for a duplicate id', async () => {
    const res = await request(app).post('/api/items').send({ id: 1 });
    expect(res.status).toBe(409);
  });
});
