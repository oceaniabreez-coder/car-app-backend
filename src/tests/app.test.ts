import request from 'supertest';
import app from '../index';


//test add car
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

test('POST /api/cars/search should return 200 and a car list', async () => {
  const res = await request(app)
    .post('/api/cars/search')
    .send({
      filter: { name: "Ruwanga car 4" },
      limit: 20
    });

  expect(res.statusCode).toBe(200);
  expect(res.body).toHaveProperty('count');
  expect(res.body).toHaveProperty('cars');
  expect(Array.isArray(res.body.cars)).toBe(true);


  if (res.body.count > 0) {
    const car = res.body.cars[0];
    expect(car).toHaveProperty('name', 'Ruwanga car 4');
    expect(car).toHaveProperty('id');
  }
});