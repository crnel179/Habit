const init = require('../dbConfig')
const bcrypt = require('bcryptjs');

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
                "isVerified": false,
                "verificationToken": null,
                "timeRequested": null
            }
        }

        return new Promise(async (resolve, reject) => {

            try {
                const db = await init();
                await db.collection('users').insertOne({ ...userinfo });
                // console.log(resp);
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
                const user = await db.collection('users').findOne({ user_email: email });
                // (OGWJ) TODO: Implement logic for updating user info.
                resolve(`updated user ${email}`);
            } catch (err) {
                reject('error: could not update user info');
            }
        });
    }

    static delete(user_email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                await db.collection('users').deleteOne({ "user_email": user_email });
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
                const res = await db.collection('users').findOne({ user_email: email });
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
                // (OGWJ) TODO: copy over logic here.
            } catch (err) {
                reject('error verifying token');
            }
        })
    }

    static requestVerification(email) {
        return new Promise(async (resolve, reject) => {
            try {
                // (OGWJ) TODO: copy over logic here.
            } catch (err) {
                reject('error requesting token');
            }
        })
    }

}

module.exports = User;