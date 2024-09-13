const Leave = require('../models/Leave');

const submitLeaveRequest = async (req, res) => {
  const { leaveType, startDate, endDate } = req.body;
  try {
    const leave = new Leave({
      employee: req.user._id,
      leaveType,
      startDate,
      endDate,
    });
    await leave.save();
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
