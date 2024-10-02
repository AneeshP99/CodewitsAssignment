const request = require('supertest');
const app = require('../app');

describe('Leave Management API Tests', () => {
  let employeeToken;
  let expect;

  before(async () => {
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  });

  it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'kaif@example.com',
        password: '12345678',
      });
  
    console.log(res.body); 
  
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    employeeToken = res.body.token.access.token;
    employeeId = res.body.user._id;
    console.log(employeeToken);
  }).timeout(30000); 
  
  it('should submit a leave request', async () => {
    console.log(employeeToken);
    const res = await request(app)
      .post('/api/leaves')
      .set('Authorization', `Bearer ${employeeToken}`)
      .send({
        employee: `${employeeId}`, 
        leaveType: 'celebrations',
        startDate: '2024-07-18',
        endDate: '2024-11-22',
      });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('status', 'Pending');
  }).timeout(30000); 
});