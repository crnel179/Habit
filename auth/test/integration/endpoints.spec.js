const request = require('supertest');
const Connection = require('../../dbConfig');
const app = require('../../index');

describe('endpoints', () => {

    describe('POST /register', () => {

        let api;
        beforeEach(async () => {
            // await resetTestDB();
        })

        beforeAll(async () => {
            await Connection.open();
            api = app.listen(3000);
        })

        afterAll(done => {
            api.close(done)
        })

        test('this should print some info and pass', async () => {
            console.log(await Connection.collection.find({}).toArray());
            expect(true).toBe(true);
        })

    })

})
