const Connection = require('./dbConfig');
const crypto = require('crypto');

async function verifyUser(name) {
    invalidateVerificationToken(name);
    updateUserVerificationStatus(name);
}

function createNewToken() {
    return crypto.randomBytes(10).toString('hex');
}

async function assertUserExists(name) {
    if (!await Connection.collection.findOne({ name: name })) return false;
    return true;
}

async function getUserVerificationToken(name) {
    const user = await Connection.collection.findOne({ name: name });
    return user.verification.token;
}

async function invalidateVerificationToken(name) {
    return await Connection.collection.updateOne({ name: name }, { $set: { "verification.token": null } });
}

async function updateUserVerificationStatus(name) {
    return await Connection.collection.updateOne({ name: name }, { $set: { isVerified: true } });
}

async function assertUserVerifed(name) {
    return await Connection.collection.findOne({ name: name }).isVerified;
}

async function updateUserVerificationToken(name, newToken) {
    return await Connection.collection.updateOne({ name: name }, { $set: { "verification.token": newToken, "verification.timeRequested": new Date() } });
}

module.exports = {
    verifyUser,
    assertUserExists,
    assertUserVerifed,
    createNewToken,
    getUserVerificationToken,
    updateUserVerificationToken
}