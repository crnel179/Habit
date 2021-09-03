const supertest = require('supertest');
const app = require('../../../api/habitRoutes');
const mongoose = require('mongoose');
const mongoDB = "mongo://127.0.0.1/test"

/*  these tests are driving me nuts, there is a problem with the above things
    the app.listen and api.close functions are not working 
    causing all the tests to fail 
*/

describe('habits endpoints', () => {
    it("has a module", () => {
        expect(app).toBeDefined();
    });
  
    let api;

    beforeAll(async () => {
        api = api.listen(5000, () => console.log('Test server running on port 5000'))
    });

    /* i do not believe this function is relevant in mongo */

    // beforeEach(async () => {
    //     await resetTestDB();
    // });

    afterAll(done => {
        console.log('Stopping the test server')
        mongoose.connection.close();
        app.close(done);
    })

    it('responds to get / with 200 and gets the welcome message', async () => {
        const res = await request(api).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toEqual('hello world');
    })

    it('should return a list of habits that are in the database', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(1);
    })
    
    it('should return a list of habits by a specific user', async () => {
        const res = await request(api).get('/habits/name');
        expect(res.statusCode).toEqual(200);
        expect(res.body.books.length).toEqual(2);
    }) 

    describe("404 error", () => {
        it("returns 404 upon incorrect url", async () => {
            await supertest(api).post("/fail").expect(res.statusCode).toEqual(404);
        })
    });

});

