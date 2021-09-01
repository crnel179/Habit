const User = require('../model/User');

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
        await User.update(req.body.email, req.body.update);
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
        User.verify(req.body.email, req.body.token);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function requestVerification(req, res) {
    try {
        User.requestVerification(req.body.email);
    } catch (err) {
        res.status(500).json({ err });
    }
}

async function recover(req, res) {
    try {
        User.recover(req.body.email, req.body.token);
    } catch (err) {
        res.status(500).json({ err });
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
    res.status(200).json(jwt.sign({ user_email: req.body.user_email }, process.env.ACCESS_SECRET, { algorithm: 'RS256' }));
}

async function refreshToken(req, res) {
    await invalidateAccessToken(req, res);
    sendToken();
}

async function invalidateAccessToken(req, res) {
    // here we can remove access token from whitelist or can blacklist
}

module.exports = { create, update, destroy, verify, requestVerification, recover, requestRecovery, sendToken, refreshToken, invalidateAccessToken, getAll };