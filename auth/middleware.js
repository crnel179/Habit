const User = require('./model/User');
const jwt = require('jsonwebtoken');

// (OGWJ) TODO: copy over logic from existing branch

const credentialsUnique = (req, res, next) => {
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

const verificationTokenValid = (req, res, next) => {
    next();
}

const emailExists = (req, res, next) => {
    next();
}

const recoveryTokenValid = (req, res, next) => {
    next();
}

const accessTokenValid = (req, res, next) => {
    try {
        jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

module.exports = {
    credentialsUnique,
    loggedIn,
    loggedOut,
    emailExists,
    loginDetailsCorrect,
    verificationTokenValid,
    recoveryTokenValid,
    accessTokenValid
}
