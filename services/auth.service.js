const httpStatus = require('http-status');
const tokenService = require('./token.service');
const { tokenTypes } = require('../config/tokens');
const User = require('../models/users.model');
const bcrypt = require('bcrypt');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await User.findOne({ email });
    if (!user) {
        throw new Error(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }

    return user;
};




module.exports = {
  loginUserWithEmailAndPassword,
};
