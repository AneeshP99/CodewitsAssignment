const passport = require('passport');
const httpStatus = require('http-status');
const { roleRights } = require('../config/roles');

// Initialize Passport strategies
passport.use(require('../config/passport').jwtStrategy);

const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      console.log('Authentication error:', err || info); // Log authentication issues
      return reject(new Error('Please authenticate'));
    }
    req.user = user;

    if (requiredRights) {
        const userRights = roleRights.get(user.role);
        const hasRequiredRights = requiredRights.every((requiredRight) => userRights.includes(requiredRight));
        if (!hasRequiredRights && req.params.userId !== user.id) {
          console.log('User does not have required rights'); // Log insufficient rights
            return reject(new Error('Forbidden'));
        }
    }

    resolve();
};

const auth = (requiredRights) => async (req, res, next) => {
    new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            verifyCallback(req, resolve, reject, requiredRights)(err, user, info);
        })(req, res, next);
    })
    .then(() => next())
    .catch((error) => {
        if (error.message === 'Forbidden') {
            res.status(httpStatus.FORBIDDEN).json({ message: error.message });
        } else {
            res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
        }
    });
};

module.exports = { auth, verifyCallback };
