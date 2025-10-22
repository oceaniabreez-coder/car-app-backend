jest.mock('firebase-admin/firestore', () => {
  const add = jest.fn(async () => ({ id: 'mock-id' }));
  const set = jest.fn(async () => {});
  const doc = jest.fn(() => ({ set }));

  const get = jest.fn(async () => ({
    docs: [
      {
        id: 'UiTEjOjZW4CJHeiaDKPF',
        data: () => ({
          id: 'UiTEjOjZW4CJHeiaDKPF',
          name: 'Ruwanga car 4',
          mpg: '17',
          cylinders: '8',
          displacement: '305',
          horsepower: '130',
          weight: '3840',
          acceleration: '15.4',
          model_year: '79',
          origin: 'usa',
        }),
      },
    ],
  }));

  const makeQuery = () => {
    const api: any = {};
    api.where   = jest.fn(() => api);
    api.orderBy = jest.fn(() => api);
    api.limit   = jest.fn(() => api);
    api.get     = get; 
    return api;
  };

  const collection = jest.fn(() => {
    const q = makeQuery();
    return { add, doc, where: q.where, orderBy: q.orderBy, limit: q.limit, get: q.get };
  });

  const getFirestore = jest.fn(() => ({ collection }));
  return { getFirestore };
});


//test add car
import request from 'supertest';
import app from '../index';

test('POST /api/cars should return 201', async () => {
  const res = await request(app).post('/api/cars').send({
    id: "UiTEjOjZW4CJHeiaDKPF",
    name: "Ruwanga car 4",
    mpg: "17",
    cylinders: "8",
    displacement: "305",
    horsepower: "130",
    weight: "3840",
    acceleration: "15.4",
    model_year: "79",
    origin: "usa"
  });
  expect(res.statusCode).toBe(201);
});

//test search car 
test('POST /api/cars/search should return 200 with expected car', async () => {
  const res = await request(app)
    .post('/api/cars/search')
    .send({ filter: { name: 'Ruwanga car 4' }, limit: 20 });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('cars');
  expect(Array.isArray(res.body.cars)).toBe(true);
  expect(res.body.cars[0]).toMatchObject({
    id: 'UiTEjOjZW4CJHeiaDKPF',
    name: 'Ruwanga car 4',
  });
});