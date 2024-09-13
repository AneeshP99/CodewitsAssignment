const request = require('supertest');
const { expect } = require('chai');
const app = require('../app'); // Your Express app

describe('Leave Management API Tests', () => {
  let employeeToken;

  before(async () => {
    // Employee login to get a token
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'employee1@example.com',
        password: 'password123',
      });
    employeeToken = res.body.token;
  });

  it('should submit a leave request', async () => {
    const res = await request(app)
      .post('/api/leaves')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({
        leaveType: 'sick',
        startDate: '2024-09-15',
        endDate: '2024-09-20',
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('status', 'pending');
  });

  it('should approve a leave request as admin', async () => {
    const res = await request(app)
      .put('/api/leaves/12345/approve') // Assuming 12345 is the leave request ID
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'approved');
  });
});
