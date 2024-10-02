const express = require('express');
const { createEmployee, getEmployees,deleteEmployee,getEmployee } = require('../controllers/employeeController');
const  {auth}  = require('../middleware/authMiddleware'); // Destructure auth from the export
const router = express.Router();


router.post('/', auth(['createEmp']), createEmployee);
router.get('/',auth(), getEmployees);
router.delete('/:employeeId', auth(['createEmp']), deleteEmployee);
router.get('/:employeeId', auth(), getEmployee);


module.exports = router;
