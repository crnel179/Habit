// (OGWJ) General TODO: Error handling. Try throw catch blocks.

const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {
    sendEmail,
    verificationEmailTemplate,
    recoveryEmailTemplate,
    emailType } = require('./email');
const Connection = require('./dbConfig');
const { createNewToken, assertUserExists, assertUserVerifed, updateUserVerificationToken, getUserVerificationToken, verifyUser } = require('./verification');
const { updateUserRecoveryToken, invalidateToken } = require('./recovery');

// –––––––––––––––––––––––––––––– User CRUD –––––––––––––––––––––––––––––– //

// NOTE: DEBUG route only, remove in production!
router.get('/users', async (req, res) => {
    const allUsers = await Connection.collection.find({}).toArray();
    res.status(200).send(allUsers);
})

// Create unverified user in database
router.post('/users', async (req, res) => {
    const salt = parseInt(process.env.SALT_ROUNDS);
    const schema = {
        // (OGWJ) Potential issue: If database breached, plain text emails are visible
        //                         and connected to potentially sensitive user habits.
        //                         However, single way hashing (e.g. the password) of 
        //                         the email would remove the ability to email the user 
        //                         after registration which is needed for GDPR compliance.
        //                         Perhaps a seperate collection of non-associated 
        //                         verified user emails is solution? This would in turn 
        //                         make account recovery difficult...

        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        name: req.body.name,
        verification: {
            isVerified: false,
            verificationToken: null,
            timeRequested: null
        }
    }
    // (OGWJ) Potential issue: If an account creation requested an is never verified
    //                         when and how to we decide to remove unverified account
    //                         blocking that email address, this is a sort of Denial 
    //                         of Service attack...

    if (assertUserExists(schema.name) || assertEmailExists(shema.email)) {
        return res.json({ error: 'username or email already in use' }).sendStatus(401);
        // (OGWJ) Potential issue: How do I safely reveal what emails or usernames exist in database?                         
        //                         Should there be a timeout for ip requests?
    }

    const newToken = createNewToken();
    if (!await Connection.collection.insertOne(schema)
        || !await updateUserVerificationToken(user, newToken)
        || !await sendEmail(schema.email, emailType.VERIFICATION, verificationEmailTemplate(schema.name, newToken))) {
        res.sendStatus(500);
    }

    res.sendStatus(201);
})

router.delete('/users', async (req, res) => {
    // (OGWJ) TODO: Recieve a valid session token or something to verify user is logged in.
    await Connection.collection.deleteOne({ name: req.body.name });
    res.sendStatus(204);
})

// Change username, email or password
router.put('/users', async (req, res) => {
    // (OGWJ) TODO: Recieve a valid session token or something to verify user is logged in.
    //              and refactory code below. updateOne set argument cannot be string template! :(
    const query = { name: req.body.name };
    const value = req.body.value;
    let update = { $set: {} };
    switch (req.body.key) {
        case 'password':
            update.$set = { password: bcrypt.hashSync(value, process.env.SALT_ROUNDS) };
            break;
        case 'name':
            update.$set = { name: value };
            break;
        case 'email':
            update.$set = { email: value };
            break;
        default:
            return res.sendStatus(403);
    }

    await Connection.collection.updateOne(query, update);
    res.sendStatus(204);
})

// –––––––––––––––––––––––––––––– End of User CRUD –––––––––––––––––––––––––––––– //

// –––––––––––––––––––––––––––––– Verification –––––––––––––––––––––––––––––– //

// Create and send another verification code to a user's email
router.post('/verify', async (req, res) => {
    const user = req.body.userName;
    if (!assertUserExists(user) || assertUserVerifed(user)) return res.sendStatus(403);

    const newToken = createNewToken();
    await updateUserVerificationToken(user, newToken);

    const email = req.body.userName;
    await sendEmail(email, emailType.VERIFICATION, verificationEmailTemplate(user, newToken));

    res.statusStatus(200);
})

router.put('/verify', async (req, res) => {

    const user = req.body.userName;
    if (!await assertUserExists(user)) return res.sendStatus(403);

    const validToken = await getUserVerificationToken(user);
    if (!validToken) return res.sendStatus(403);

    const requestToken = req.body.token;
    if (requestToken !== validToken) return res.sendStatus(401);

    verifyUser(user);
    res.sendStatus(200);
})

// –––––––––––––––––––––––––––––– End of Verification –––––––––––––––––––––––––––––– //

// –––––––––––––––––––––––––––––– Recovery –––––––––––––––––––––––––––––– //

// (OGWJ) TODO: should make all assertions middleware and return res.sendStatus from them

// Create and send recovery token to user's email
router.post('/recovery', async (req, res) => {
    const user = req.body.userName;
    if (!await assertUserExists(user) ||
        !await assertUserVerifed(user)) return res.sendStatus(403);

    // (OGWJ) TODO: Here check username against email.
    // (OGWJ) Potential issue: Denial of service attack possible by requesting recovery codes.
    //                         Perhaps we should limit requests for account recovery with a
    //                         timeout?
    const recoveryCode = createNewToken();
    await updateUserRecoveryToken(user, recoveryCode);
    await sendEmail(req.body.email, emailType.RECOVERY, recoveryEmailTemplate(user, recoveryCode));
    res.sendStatus(200);
})

router.put('/recovery', async (req, res) => {
    const user = req.body.userName;
    if (!await assertUserExists(user)
        || !await assertUserVerifed(user)
        || !await assertIsValidRecoveryToken(req.body.token)) {
        return res.sendStatus(403);
    }

    // Clientside logs user in
    // Hits change password endpoint with new password and session token

    await invalidateToken(user);
    res.send(200);
})

// –––––––––––––––––––––––––––––– End of Recovery –––––––––––––––––––––––––––––– //


module.exports = router;