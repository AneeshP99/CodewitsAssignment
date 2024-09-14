const express = require('express');
const { submitLeaveRequest, updateLeaveStatus } = require('../controllers/leaveController');
const {auth} = require('../middleware/authMiddleware');
const {verifyCallback} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyCallback, submitLeaveRequest);
router.put('/:id', verifyCallback, auth(['employee']), updateLeaveStatus);

module.exports = router;
