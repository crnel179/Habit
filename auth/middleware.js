const User = require('./model/User');

// (OGWJ) TODO: copy over logic from existing branch

const uniqueCredentials = (req, res, next) => {
    next();
}

const loggedIn = (req, res, next) => {
    next();
}

const loggedOut = (req, res, next) => {
    next();
}

const loginDetailsCorrect = (req, res, next) => {
    next();
}

const validVerificationToken = (req, res, next) => {
    next();
}

module.exports = {
    uniqueCredentials,
    loggedIn,
    loggedOut,
    loginDetailsCorrect,
    validVerificationToken
}
