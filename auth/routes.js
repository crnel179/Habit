const express = require('express')
const userRouter = express.Router()
const tokenRouter = express.Router()
const controller = require('./controllers/users');
const check = require('./middleware');

// –––––––––––––––––––––– DEBUG –––––––––––––––––––––––––––––––– //
userRouter.get('/', check.uniqueCredentials, controller.getAll);
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //
userRouter.post('/', check.uniqueCredentials, controller.create);
userRouter.put('/', [check.loggedIn, check.uniqueCredentials], controller.update);
userRouter.delete('/', [check.loggedIn, check.loginDetailsCorrect], controller.destroy);

userRouter.post('/verify', check.loginDetailsCorrect, controller.requestVerification);
userRouter.put('/verify', check.validVerificationToken, controller.verify);

// Not yet implemented
tokenRouter.get('/', (req, res) => { res.status(200).json({ token: 'token' }) });
tokenRouter.post('/', (req, res) => { res.sendStatus(200) });

module.exports = { userRouter };