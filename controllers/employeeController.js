const Employee = require('../models/employee.model');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const config = require('../config/config');

const createEmployee = async (req, res) => {
  const { name, email, position, salary, department } = req.body;
  try {
    const employee = new Employee({ name, email, position, salary, department });
    await employee.save();
    res.status(201).send(employee);

    const savedEmployee = await employee.save();
    
        // Create a corresponding user for login with employee role
        const newUser = new User({
            name,
            email,
            password,
            role: 'employee',
            EmployeeId: savedEmployee._id
        });
        const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ token });
        const savedUser = await newUser.save();

        return { savedEmployee, savedUser };
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).send(employees);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).send('Employee not found');
    res.status(200).send(employee);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).send('Employee not found');
    res.status(200).send('Employee deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { createEmployee, getEmployees, updateEmployee, deleteEmployee };
