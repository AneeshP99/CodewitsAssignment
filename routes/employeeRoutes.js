const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const { verifyToken, roleAuth } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, roleAuth('Admin'), createEmployee);
router.get('/', verifyToken, roleAuth('Admin'), getEmployees);
router.put('/:id', verifyToken, roleAuth('Admin'), updateEmployee);
router.delete('/:id', verifyToken, roleAuth('Admin'), deleteEmployee);

module.exports = router;
