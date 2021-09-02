const init = require('../dbConfig')
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Email = require('./Email');

class User {
    constructor(body) {
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
        this.verification = body.verification;
    }

    get json() {
        return {
            "user_name": this.name,
            "user_email": this.email,
            "user_password": this.password,
            "user_verification": this.verification
        }
    }


    static getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const users = await db.collection('users').find({}).toArray();
                resolve(users);
            } catch (err) {
                reject('error: could not get users');
            }
        })

    }

    static create(body) {

        const hash = bcrypt.hashSync(body.password, 10);

        let userinfo = {
            "user_email": body.user_email,
            "pseudoname": body.user_name,
            "password": hash,
            "habits": {},
            "verification": {
                "status": false,
                "verificationToken": null,
                "timeRequested": null
            }
        }

        return new Promise(async (resolve, reject) => {

            try {
                const db = await init();
                await db.collection('users').insertOne({ ...userinfo });
                resolve(userinfo.user_email);
            } catch (err) {
                console.log(err);
                reject('error: could not create user');
            }
        })
    }

    static update(email, update) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').updateOne({ "user_email": email }, { $set: { [update.parameter]: update.value } });
                resolve(`updated user ${email}`);
            } catch (err) {
                reject('error: could not update user info');
            }
        });
    }

    static delete(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').deleteOne({ "user_email": email });
                // (OGWJ) TODO: if user doesnt exist before this is called, no error is thrown!
                resolve(user_email);
            } catch (err) {
                reject('error: could not delete user');
            }
        });
    }

    static exists(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const res = await db.collection('users').findOne({ "user_email": email });
                if (!res) resolve(false);
                resolve(true);
            } catch (err) {
                reject('error checking for use existence')
            }
        })
    }

    static verify(email, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const validToken = User.retrieveVerificationToken(email);
                if (!validToken || token !== validToken) throw Error();
                await db.collection('users').updateOne({ "user_email": email }, { '$set': { "verification.token": null, "verification.status": true } })
                resolve(true)
            } catch (err) {
                reject('error verifying token');
            }
        })
    }

    static requestVerification(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const newToken = await crypto.randomBytes(10).toString('hex');
                await db.collection('users').updateOne({ "user_email": email }, { '$set': { "verification.token": newToken, "verification.timeRequested": Date() } })
                // await Email.sendCode(email, newToken, Email.types.VERIFICATION);
                resolve(newToken);
            } catch (err) {
                reject('error requesting token');
            }
        })
    }

    static recover(email, token) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').updateOne({ "user_email": email }, { '$set': { "recovery.token": null } })
                resolve();
            } catch (err) {
                reject('error verifying token');
            }
        })
    }

    static requestRecovery(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const newToken = crypto.randomBytes(10).toString('hex');
                await db.collection('users').updateOne({ "user_email": email }, { '$set': { "recovery.token": newToken, "recovery.timeRequested": Date() } })
                await Email.sendCode(email, newToken, Email.types.RECOVERY);
                resolve();
            } catch (err) {
                reject('error requesting token');
            }
        })
    }

    static retrieveRecoveryToken(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const token = await db.collection('users').find(
                    { "user_email": email },
                    {
                        projection: {
                            _id: false,
                            "recovery.token": true
                        }
                    })
                if (!!token) resolve(token);
                throw Error()
            } catch (err) {
                reject('error verifying token');
            }
        })
    }

    static retrieveVerificationToken(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const token = await db.collection('users').find(
                    { "user_email": email },
                    {
                        projection: {
                            _id: false,
                            "verification.token": true
                        }
                    })
                if (!!token) resolve(token);
                throw Error()
            } catch (err) {
                reject('error verifying token');
            }
        })

    }

    static comparePassword(email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const hash = await db.collection('users').findOne(
                    { "user_email": email },
                    {
                        projection: {
                            _id: false,
                            "password": 1
                        }
                    })
                if (!hash || !bcrypt.compareSync(password, hash.password)) throw Error();
                resolve(true);
            } catch (err) {
                reject('error verifying fetching password');
            }
        })

    }

}

module.exports = User;