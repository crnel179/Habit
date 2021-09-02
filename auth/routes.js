const express = require('express')
const userRouter = express.Router()
const tokenRouter = express.Router()
const controller = require('./controllers/users');
const check = require('./middleware');

// –––––––––––––––––––––– DEBUG –––––––––––––––––––––––––––––––– //
userRouter.get('/', controller.getAll);
const Email = require('./model/Email');
async function testEmail(req, res) {
    try {
        await Email.sendCode('HabitSmasherApp@gmail.com', 'token', Email.types.VERIFICATION)
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

userRouter.get('/testemail', testEmail);
// ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– //
userRouter.post('/', check.emailDoesNotExist, controller.create);
// TODO
userRouter.put('/', [check.loggedIn, check.emailDoesNotExist], controller.update); // NOT IMPLEMENTED
userRouter.delete('/', [check.loggedIn, check.loginDetailsCorrect], controller.destroy);

userRouter.post('/verify', check.loginDetailsCorrect, controller.requestVerification);
// TODO
userRouter.put('/verify', check.verificationTokenValid, controller.verify);

// TODO
userRouter.post('/recovery', check.emailExists, controller.requestRecovery);
// TODO
userRouter.put('/recovery', check.recoveryTokenValid, controller.recover);

userRouter.get('/login', [check.loggedOut, check.loginDetailsCorrect], controller.sendToken);
userRouter.put('/logout', check.accessTokenValid, controller.invalidateAccessToken);

tokenRouter.get('/refresh', check.accessTokenValid, controller.refreshToken);
tokenRouter.post('/authenticate', check.accessTokenValid, (req, res) => { res.sendStatus(200) });

module.exports = { userRouter, tokenRouter };