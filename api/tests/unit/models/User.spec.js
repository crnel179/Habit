const User = require('../../../model/User');
const { MongoClient } = require ('mongodb');
jest.mock('mongodb');

const db = require('../../../dbConfig');

describe('User', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with user on successful db query', async () => {
            jest.spyOn(db, 'collection')
                .mockResolvedValueOnce({rows: [{}, {}, {}]})
            const all = await User.all;
            expect(all).toHaveLength(1)
        })
    });

    describe('findByName', () => {
        test('it resolves with user on successful db query', async () => {
            let userData = { name: 'user' }
            jest.spyOn(db, 'collection')
                .mockResolvedValueOnce({rows: [ userData ] });
            const result = await User.findByName('user');
            expect(result).toBeInstanceOf(User)
        })
    });

    
    
})