const request = require('supertest');
const app = require('../src/app');

describe('Health & Version Endpoints', () => {
  test('GET /health returns status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.version).toBeDefined();
    expect(res.body.uptime_seconds).toBeGreaterThanOrEqual(0);
  });

  test('GET /version returns version string', async () => {
    const res = await request(app).get('/version');
    expect(res.status).toBe(200);
    expect(res.body.version).toBeDefined();
  });
});

describe('Calculator Endpoint', () => {
  test('POST /calculate adds two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 5, b: 3, operation: 'add' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(8);
  });

  test('POST /calculate subtracts two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 10, b: 4, operation: 'subtract' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(6);
  });

  test('POST /calculate multiplies two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 6, b: 7, operation: 'multiply' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(42);
  });

  test('POST /calculate divides two numbers', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 20, b: 4, operation: 'divide' });
    expect(res.status).toBe(200);
    expect(res.body.result).toBe(5);
  });

  test('POST /calculate returns 400 on division by zero', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 10, b: 0, operation: 'divide' });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('zero');
  });

  test('POST /calculate returns 400 on unknown operation', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 1, b: 2, operation: 'unknown' });
    expect(res.status).toBe(400);
  });

  test('POST /calculate returns 400 when fields are missing', async () => {
    const res = await request(app)
      .post('/calculate')
      .send({ a: 1 });
    expect(res.status).toBe(400);
  });
});

describe('User Validation Endpoint', () => {
  test('POST /users/validate accepts valid user', async () => {
    const res = await request(app)
      .post('/users/validate')
      .send({ user: { name: 'Alice Smith', email: 'alice@example.com', role: 'admin' } });
    expect(res.status).toBe(200);
    expect(res.body.valid).toBe(true);
  });

  test('POST /users/validate rejects invalid email', async () => {
    const res = await request(app)
      .post('/users/validate')
      .send({ user: { name: 'Bob', email: 'not-an-email', role: 'user' } });
    expect(res.status).toBe(422);
    expect(res.body.valid).toBe(false);
  });

  test('POST /users/validate rejects missing name', async () => {
    const res = await request(app)
      .post('/users/validate')
      .send({ user: { email: 'test@example.com' } });
    expect(res.status).toBe(422);
    expect(res.body.errors.length).toBeGreaterThan(0);
  });

  test('POST /users/validate rejects invalid role', async () => {
    const res = await request(app)
      .post('/users/validate')
      .send({ user: { name: 'Charlie', email: 'charlie@example.com', role: 'superadmin' } });
    expect(res.status).toBe(422);
  });
});
