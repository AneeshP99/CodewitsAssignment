const express = require('express');
const { createLeave,getLeaves,judgeLeave,getLeave,deleteLeave } = require('../controllers/leaveController');
const {auth} = require('../middleware/authMiddleware');
const {verifyCallback} = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/',auth(['createL']),createLeave);
router.get('/', getLeaves);
router.get('/:leaveId',auth(), getLeave);
router.put('/:leaveId/judge', auth(['judge']), judgeLeave);
router.delete('/:leaveId', auth(['createL']), deleteLeave);
module.exports = router;
