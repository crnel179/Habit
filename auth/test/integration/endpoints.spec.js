const request = require('supertest');
const app = require('./index');

describe('endpoints', () => {

    describe('POST /register', () => {

        beforeEach(async () => {
            await resetTestDB;
        })

        beforeAll(async () => {
            api = app.listen(process.env.PORT);
            console.log(`started test server on port ${process.env.PORT}`);
        })

        afterAll(done => {
            console.log(`stopping test server on port ${process.env.PORT}`);
            api.close(done)
        })

        // test('should add new unverified user to database', () => {

        // })

        // test('attempts to add existing user return THIS error', () => {

        // })

        // test('missing fields in post data returns THIS error', () => {

        // })

        // test('', () => {

        // })
    })

})
