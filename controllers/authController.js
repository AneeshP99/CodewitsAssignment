const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register user (Admin or Employee)
const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    // Ensure role is either admin or employeee
    if (!['admin', 'employee'].includes(role)) {
      return res.status(400).send('Invalid role provided');
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).send('User already exists');

    
    user = new User({ name, email, password, role });
    await user.save();

    
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};


const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).send('Invalid credentials');

    
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).send('Invalid credentials');

    // Generate JWT
    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = { register, login };
