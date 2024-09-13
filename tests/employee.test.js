const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Your Express app

describe('Admin Employee Management API Tests', () => {
  let adminToken;

  before(async () => {
    // Admin login to get a token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'admin@example.com',
        password: 'adminpassword',
      });
    adminToken = res.body.token;
  });

  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Employee One',
        email: 'employee1@example.com',
        position: 'Developer',
        salary: 50000,
        department: 'Engineering',
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('name', 'Employee One');
  });

  it('should fetch employee details', async () => {
    const res = await request(app)
      .get('/api/employees/employee1@example.com')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('email', 'employee1@example.com');
  });
});
