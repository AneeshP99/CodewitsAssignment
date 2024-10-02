const request = require('supertest');
const app = require('../app');

describe('Authentication API Tests', () => {
  let expect;

  before(async () => {
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'aneesh@gmail.com',
        password: '12345678',
      });

    console.log(res.body); 

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    adminToken = res.body.token.access.token;
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test User GOLEM',
        email: 'test@golem.com',
        password: 'password1232',
        role: 'admin',
      });

    console.log(res.body); 

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('token');
  });

  
});
