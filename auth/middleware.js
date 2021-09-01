const User = require('./model/User');
const jwt = require('jsonwebtoken');

const loggedIn = (req, res, next) => {
    // (OGWJ) NOTE: Perhaps accessTokenValid middleware is enough to test this?
    next();
}

const loggedOut = (req, res, next) => {
    // (OGWJ) NOTE: Not sure how to test this. Maybe test if valid access token exists + something.
    next();
}

const loginDetailsCorrect = async (req, res, next) => {
    try {
        if (!await User.comparePassword(req.body.user_email, req.body.password)) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const emailExists = async (req, res, next) => {
    try {
        if (!await User.exists(req.body.user_email)) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const emailDoesNotExist = async (req, res, next) => {
    try {
        if (await User.exists(req.body.user_email)) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const verificationTokenValid = async (req, res, next) => {
    try {
        const token = await User.retrieveVerificationToken(req.body.email);
        if (token !== req.body.token) return res.sendStatus(401);
        // (OGWJ) TODO: Check if expired.
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const recoveryTokenValid = async (req, res, next) => {
    try {
        const token = await User.retrieveRecoveryToken(req.body.email);
        // (OGWJ) TODO: Check if expired.
        if (token !== req.body.token) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const accessTokenValid = (req, res, next) => {
    try {
        jwt.verify(token, process.env.ACCESS_SECRET);
        // (OGWJ) TODO: conditional check whitelist/blacklist for token;
    } catch (err) {
        res.sendStatus(401);
    }
    next();
}

module.exports = {
    loggedIn,
    loggedOut,
    emailExists,
    emailDoesNotExist,
    loginDetailsCorrect,
    verificationTokenValid,
    recoveryTokenValid,
    accessTokenValid
}
