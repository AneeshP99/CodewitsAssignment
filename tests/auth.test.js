const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Your Express app

describe('Authentication API Tests', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
