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
userRouter.put('/', [check.loggedIn, check.emailDoesNotExist], controller.update); // NOT IMPLEMENTED
userRouter.delete('/', [check.loggedIn, check.loginDetailsCorrect], controller.destroy);

userRouter.post('/verify', check.loginDetailsCorrect, controller.requestVerification);
userRouter.put('/verify', check.verificationTokenValid, controller.verify);

userRouter.post('/recovery', check.emailExists, controller.requestRecovery);
userRouter.put('/recovery', check.recoveryTokenValid, controller.recover);

tokenRouter.get('/', check.loggedIn, controller.sendToken);
tokenRouter.post('/', check.accessTokenValid, (req, res) => { res.sendStatus(200) });

module.exports = { userRouter };