const express = require('express');
const authController = require('../controllers/authController'); // Import controller
const router = express.Router();
const {auth} = require('../middleware/authMiddleware');


router.post('/register',auth(['createEmp']), authController.register);


router.post('/login', authController.login);

module.exports = router;
