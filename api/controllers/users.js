const User = require('../model/User');
const jwt = require('jsonwebtoken');
const blacklist = require('../data/tokenBlacklist');

// ––––––––––––– DEBUG –––––––––––––– //
async function getAll(req, res) {
    try {
        const users = await User.getAll();
        res.status(201).json({ users });
    }
    catch (err) {
        res.status(422).json({ err });
    }
}
// ––––––––––––– ENDOF DEBUG –––––––––––––– //


async function create(req, res) {
    try {
        await User.create(req.body);
        res.sendStatus(201)
    }
    catch (err) {
        res.status(422).json({ err });
    }
}

async function update(req, res) {
    try {
        // Only accept one valid user param update at a time!
        const validKeys = ["user_email", "pseudoname", "password"];
        const givenKey = req.body.update.keys()[0];
        if (!validKeys.includes(givenKey)) return res.sendStatus(401);
        const update = {
            parameter: givenKey, value: req.body.update.entries()[0].value
        }
        await User.update(req.body.email, update);
        res.sendStatus(200);

    }
    catch (err) {
        // (OGWJ) TODO: check http code here
        res.status(422).json({ err })
    }
}

async function destroy(req, res) {
    try {
        await User.delete(req.body.user_email);
        res.sendStatus(200);
    }
    catch (err) {
        res.status(400).json({ err });
    }
}

async function verify(req, res) {
    try {
        await User.verify(req.body.user_email);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function requestVerification(req, res) {
    try {
        await User.requestVerification(req.body.user_email)
        res.sendStatus(200);
    } catch (err) {
        res.status(401).json({ err });
    }
}

async function recover(req, res) {
    try {
        await User.recover(req.body.email, req.body.token);
        res.sendStatus(200);
    } catch (err) {
        res.status(401).json({ err });
    }
}

async function requestRecovery(req, res) {
    try {
        User.requestRecovery(req.body.email);
    } catch (err) {
        res.status(500).json({ err });
    }
}

function sendToken(req, res) {
    res.status(200).json(jwt.sign({ user_email: req.body.user_email }, process.env.ACCESS_SECRET));
}

async function refreshToken(req, res) {
    await invalidateAccessToken(req, res);
    res.status(200).json(jwt.sign({ user_email: req.body.user_email }, process.env.ACCESS_SECRET));
}

async function invalidateAccessToken(req, res) {
    blacklist.push(req.body.token);
    return;
}

module.exports = { create, update, destroy, verify, requestVerification, recover, requestRecovery, sendToken, refreshToken, invalidateAccessToken, getAll };