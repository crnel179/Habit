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
    try {
        const token = await User.retrieveVerificationToken(req.body.email);
        if (token !== req.body.token) res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const emailExists = (req, res, next) => {
    next();
}

const recoveryTokenValid = (req, res, next) => {
    try {
        const token = await User.retrieveRecoveryToken(req.body.email);
        if (token !== req.body.token) res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const accessTokenValid = (req, res, next) => {
    try {
        jwt.verify(token, process.env.ACCESS_SECRET);
    } catch (err) {
        res.sendStatus(401);
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
