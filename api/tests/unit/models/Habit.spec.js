const Habit = require('../../../model/Habit');
const { MongoClient } = require ('mongodb');
jest.mock('mongodb');

const db = require('../../../dbConfig');

/* test suite runs but failsssssss helppppp */

describe('Habit', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())

    describe('all', () => {
        test('it resolves with habits on successful db query', async () => {
            jest.spyOn(db, 'query')
                .mockResolvedValueOnce({rows: [{}, {}, {}]})
            const all = await Habit.all;
            expect(all).toHaveLength(1)
        })
    });

    
})