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
        console.log(req.body);
        const newUser = await User.create(req.body);
        res.status(201).json({ email: newUser.email });
    }
    catch (err) {
        res.status(422).json({ err });
    }
}

async function update(req, res) {
    try {
        const updatedUser = await User.update(req.body.email, req.body.update);
        res.status(200).json({ email: updatedUser.email });
    }
    catch (err) {
        // (OGWJ) TODO: check http code here
        res.status(422).json({ err })
    }
}

async function destroy(req, res) {
    try {
        const deletedUser = await User.delete(req.body.email);
        res.status(200).json(deletedUser);
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

module.exports = { create, update, destroy, verify, requestVerification, getAll };