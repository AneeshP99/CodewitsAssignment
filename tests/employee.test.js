const request = require('supertest'); 
const app = require('../app');

describe('Admin Employee Management API Tests', () => {
  let adminToken;
  let expect;
  let employeeId; 

  before(async () => {
    const { expect: chaiExpect } = await import('chai');
    expect = chaiExpect;
  });
    // Admin login to get a token
    it('should login a user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'aneesh@gmail.com',
        password: '12345678',
      });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');  
    adminToken = res.body.token.access.token;
    console.log(adminToken);
    console.log(2);
    }).timeout(30000); 
  it('should create a new employee', async () => {
    const res = await request(app)
      .post('/api/employees')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Employee PARTH',
        email: 'employeeParth@example.com',
        position: 'Developer',
        salary: '50000',
        department: 'Engineering',
        password: 'password123',
      }).timeout(30000);

    expect(res.status).to.equal(201);
    console.log("resbpdy", JSON.stringify(res.body, null, 2));
    expect (res.body.savedEmployee).to.have.property('name', 'Employee PARTH');
    console.log(1);
    employeeId = res.body.savedEmployee._id; 
  }).timeout(30000);

  it('should fetch employee details', async () => {
    const res = await request(app)
      .get(`/api/employees/${employeeId}`) 
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('email','employeeParth@example.com');
  }).timeout(30000);
});
