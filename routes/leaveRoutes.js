const express = require('express');
const { submitLeaveRequest, updateLeaveStatus } = require('../controllers/leaveController');
const { verifyToken, roleAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, roleAuth('Employee'), submitLeaveRequest);
router.put('/:id', verifyToken, roleAuth('Admin'), updateLeaveStatus);

module.exports = router;
