const User = require('./model/User');
const jwt = require('jsonwebtoken');

// (OGWJ) TODO: copy over logic from existing branch

const loggedIn = (req, res, next) => {
    // (OGWJ) NOTE: Perhaps accessTokenValid middleware is enough to test this?
    next();
}

const loggedOut = (req, res, next) => {
    // (OGWJ) NOTE: Not sure how to test this. Maybe test if valid access token exists + something.
    next();
}

const loginDetailsCorrect = (req, res, next) => {
    try {
        const hash = await User.retrievePassword(req.body.user_email);
        if (!bcrypt.compareSync(req.body.password, hash)) throw Error()
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const verificationTokenValid = (req, res, next) => {
    try {
        const token = await User.retrieveVerificationToken(req.body.email);
        if (token !== req.body.token) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const emailExists = (req, res, next) => {
    try {
        if (!await User.exists(req.body.user_email)) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const emailDoesNotExist = (req, res, next) => {
    try {
        if (await User.exists(req.body.user_email)) return res.sendStatus(401);
    } catch (err) {
        res.sendStatus(403);
    }
    next();
}

const recoveryTokenValid = (req, res, next) => {
    try {
        const token = await User.retrieveRecoveryToken(req.body.email);
        if (token !== req.body.token) return res.sendStatus(401);
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
    emailDoesNotExist,
    loginDetailsCorrect,
    verificationTokenValid,
    recoveryTokenValid,
    accessTokenValid
}
