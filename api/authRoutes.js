const express = require('express')
const userRouter = express.Router()
const tokenRouter = express.Router()
const controller = require('./controllers/users');
const check = require('./middleware');

userRouter.post('/', check.emailDoesNotExist, controller.create);
userRouter.put('/', [check.loggedIn, check.emailDoesNotExist], controller.update);
userRouter.delete('/', [check.loggedIn, check.loginDetailsCorrect], controller.destroy);

userRouter.post('/verify', check.loginDetailsCorrect, controller.requestVerification);
userRouter.put('/verify', check.verificationTokenValid, controller.verify);

userRouter.post('/login', [check.loggedOut, check.loginDetailsCorrect, check.userVerified], controller.sendToken);
userRouter.put('/logout', check.accessTokenValid, (req, res) => { controller.invalidateAccessToken(req, res); res.sendStatus(200) });

tokenRouter.post('/refresh', check.accessTokenValid, controller.refreshToken);
tokenRouter.post('/authenticate', check.accessTokenValid, (req, res) => { res.sendStatus(200) });

module.exports = { userRouter, tokenRouter };