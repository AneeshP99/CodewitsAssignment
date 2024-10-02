const authController = require('./authController');
const Leave = require('../models/leave.model');
const User = require('../models/users.model');
const httpStatus = require('http-status');

const createLeave = async (req, res) => {
    
    try {
      const { employee,leaveType,startDate,endDate } = req.body;
      const employee1 = await User.findById(employee);
      console.log('1');
      if (!employee1) throw new Error('Employee not found or invalid role');
      if(employee1.role !== 'employee')throw new error('invalid role');
      const newLeave = new Leave({
        employee,
        leaveType,
        startDate,
        endDate,
        status: 'Pending',
      });
      console.log('2');
      const leave= await newLeave.save();
      res.status(httpStatus.CREATED).send(leave);
      console.log('3');
      }
      catch (error) {
          throw error;
      }
};

const getLeaves = async (req, res) => {
  try {
    const result= await Leave.find(req.query);
    res.status(200).send(result);
  }
catch (error) {
    console.error(error);
    res.status(500).send({ error: 'An error occurred while fetching leaves.' });
}    
};

const judgeLeave = async (req, res) => {
  const leave = await Leave.findById(req.params.leaveId);
  if (!leave) throw new Error('Leave not found');

  leave.status = req.body.status;
  await leave.save();
  res.send(leave);
  return await leave.save();
    
}

const getLeave = async (req, res) => {
  try {
    const leave=await Leave.findById(req.params.leaveId);
    console.log(req.params.leaveId);
    if (!leave) {
      throw new Error(httpStatus.NOT_FOUND);
  }
  res.send(leave);
  }
catch(error){
    throw error;
}
};


const deleteLeave = async (req, res) => {
  try {
    const leave=await Leave.findByIdAndDelete(req.params.leaveId);
    res.send(leave);
    return {message: 'Leave deleted successfully'}
}
catch(error){
    throw error;
}
};

module.exports = {
    createLeave,
    getLeaves,
    getLeave,
    deleteLeave,
    judgeLeave,
};
