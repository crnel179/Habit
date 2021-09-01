const init = require('../dbConfig')

class User {
    constructor(body) {
        this.name = body.name;
        this.email = body.email;
        this.password = body.password;
        this.verification = body.verification;
    }


    static getAll() {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const users = await db.collection(process.env.DB_COLLECTION).find({}).toArray();
                resolve(users);
            } catch (err) {
                reject('error: could not get users');
            }
        })

    }

    static create(body) {

        body.verification = {
            isVerified: false,
            verificationToken: null,
            timeRequested: null
        }

        body.password = bcrypt.hashSync(body.password, process.env.SALT_ROUNDS);
        const user = new User(body);

        return new Promise(async (resolve, reject) => {

            try {
                const db = await init();
                await db.collection(process.env.DB_COLLECTION).insertOne(user)
            } catch (err) {
                reject('error: could not create user');
            }
        })
    }

    static update(email, update) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const user = await db.collection(process.env.DB_COLLECTION).findOne({ user_email: email });
                // (OGWJ) TODO: Implement logic for updating user info.
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
                await db.collection(process.env.DB_COLLECTION).deleteOne({ user_email: email });
                resolve(`deleted user ${email}`);
            } catch (err) {
                reject('error: could not delete user');
            }
        });
    }

    static exists(email) {
        return new Promise(async (resolve, reject) => {
            try {
                const db = await init();
                const res = await db.collection(process.env.DB_COLLECTION).findOne({ user_email: email });
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