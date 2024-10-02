const httpStatus = require('http-status');
const authServices = require('../services/auth.service');
const tokenServices = require('../services/token.service');
const User = require('../models/users.model');
const register = async(req, res) => {
    try {
        const user=await User.create(req.body);
        const token = await tokenServices.generateAuthTokens(user);
        res.status(httpStatus.CREATED).send({user, token});
    }
    catch (error) {
        throw error;
    }
};

const login = async(req, res) => {

    const {email, password} = req.body;
    const user = await authServices.loginUserWithEmailAndPassword(email, password);
    const token = await tokenServices.generateAuthTokens(user);
    res.status(httpStatus.OK).send({user, token});

};


module.exports = {
    register,
    login,
}