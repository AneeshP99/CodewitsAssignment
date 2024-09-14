const express = require('express');
const { createEmployee, getEmployees, updateEmployee, deleteEmployee } = require('../controllers/employeeController');
const  {auth}  = require('../middleware/authMiddleware'); // Destructure auth from the export
const router = express.Router();

// Routes with role-based authorization
router.post('/', auth(['admin']), createEmployee);
router.get('/', getEmployees);
router.put('/:id', updateEmployee);
router.delete('/:id', auth(['admin']), deleteEmployee);

module.exports = router;
