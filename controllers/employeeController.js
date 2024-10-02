const httpStatus = require('http-status');
const Employee = require('../models/employee.model');
const User = require('../models/users.model');

const getEmployeeById = async (req,res) =>{
  try {
      return await Employee.findById(req.params.employeeId);
  }
  catch(error){
      throw error;
  }
};

const createEmployee = async (req, res) => {
  try {
    const { name,email,position,salary,department,password} = req.body;

    const newEmployee = new Employee({
      name,
      email,
      position,
      salary,
      department
    });
    console.log(11);
    const savedEmployee = await newEmployee.save();
    console.log(12);
    const newUser = new User({
        name,
        email,
        password,
        role: 'employee',
        employeeId: savedEmployee._id
    });
    console.log(13);
    const savedUser = await newUser.save();
    res.status(httpStatus.CREATED).send({ savedEmployee, savedUser });
    console.log(14);
  } catch (err) {
    throw err;
  }
    
};

const getEmployees = async (req, res) => {
  try {
    const result = await Employee.find(req.query);
    res.send(result);
    }
catch (error) {
    throw error;
}
    
};

const getEmployee = async (req, res) => {
  try {
    console.log("10001")
     const employee = await Employee.findById(req.params.employeeId);
     console.log("1000")
     console.log(employee)
     res.send(employee);
     console.log("10002")
      }
catch(error){
    throw error;
}   
};


const deleteEmployee = async (req, res) => {
  try {
    const employee=await Employee.findByIdAndDelete(req.params.employeeId);
    if (!employee) {
      return res.status(httpStatus.NOT_FOUND).send({ message: 'Employee not found' });
    }   
    res.send(employee);
  }
catch(error){
    throw error;
}
    
};

module.exports = {
    createEmployee,
    getEmployees,
    getEmployee,
    deleteEmployee
};
