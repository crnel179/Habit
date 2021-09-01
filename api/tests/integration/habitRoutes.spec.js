describe('habits endpoints', () => {
    
    let api;
    beforeEach(async () => {
        await resetTestDB();
    });

    beforeAll(async () => {
         api = api.listen(5000, () => console.log('Test server running on port 5000'))
     });

    afterAll(async () => {
        console.log('Stopping the test server')
        api.close(done)
    })

    it('should return a list of habits that are in the database', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
    })
    
    it('should return a list of habits by a specific user', async () => {
        const res = await request(api).get('/habits/name');
        expect(res.statusCode).toEqual(200);
        expect(res.body.books.length).toEqual(2);
    }) 



});