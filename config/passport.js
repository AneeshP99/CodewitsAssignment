//const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { User } = require('../models');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    console.log('JWT payload:', payload); // Log payload for debugging
    const user = await User.findById(payload._id);
    if (!user) {
      console.log('User not found'); // Log if user is not found
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    console.log('JWT verify error:', error); // Log errors
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// Initialize Passport and use the JWT strategy
//passport.use(jwtStrategy);

module.exports = {jwtStrategy}; // Export passport for use in the main file
