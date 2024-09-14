const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  position: { type: String, required: false },
  salary: { type: Number, required: false },
  department: { type: String, required: false }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;
