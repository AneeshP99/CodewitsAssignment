const Leave = require('../models/leave.model');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const config = require('../config/config');

const submitLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate } = req.body;
  try {
    console.log('Received leave request:', { leaveType, startDate, endDate });

    // Ensure req.user._id is available
    if (!req.user || !req.user._id) {
      return res.status(400).send('Invalid or missing user ID');
    }
    const leave = new Leave({
      employee: req.user._id,
      leaveType,
      startDate,
      endDate,
    });
    await leave.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
    res.status(201).send(leave);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateLeaveStatus = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!leave) return res.status(404).send('Leave not found');
    res.status(200).send(leave);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { submitLeaveRequest, updateLeaveStatus };
