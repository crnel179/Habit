const express = require('express')
const userRouter = express.Router()
const tokenRouter = express.Router()
const jwt = require('jsonwebtoken');
const controller = require('./controllers/users');
const check = require('./middleware');

// –––––––––––––––––––––– DEBUG –––––––––––––––––––––––––––––––– //
userRouter.get('/', check.uniqueCredentials, controller.getAll);
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //
userRouter.post('/', check.credentialsUnique, controller.create);
userRouter.put('/', [check.loggedIn, check.credentialsUnique], controller.update); // NOT IMPLEMENTED
userRouter.delete('/', [check.loggedIn, check.loginDetailsCorrect], controller.destroy);

userRouter.post('/verify', check.loginDetailsCorrect, controller.requestVerification);
userRouter.put('/verify', check.verificationTokenValid, controller.verify);

userRouter.post('/recovery', check.emailExists, controller.requestRecovery);
userRouter.put('/recovery', check.recoveryTokenValid, controller.recover);

// Not yet implemented
tokenRouter.get('/', check.loggedIn, controller.sendToken);
tokenRouter.post('/', check.accessTokenValid, (req, res) => { res.sendStatus(200) });

module.exports = { userRouter };