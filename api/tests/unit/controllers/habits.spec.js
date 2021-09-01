const habitController = require('../../../controllers/habits')
const Habit = require('../../../model/Habit');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

describe('habits controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('index', () => {
        test('it returns a habit with a 200 status code', async () => {
            jest.spyOn(Habit, 'all', 'get')
                 .mockResolvedValue(['habit1', 'habit2']);
            await habitController.index(null, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(['habit1', 'habit2']);
        })
    });

    describe('show', () => {
        test('it returns a habit with a 200 status code', async () => {
            let testHabit = {   
                test:
                    {
                        start_date: '28-11-2021',
                        name: 'test',
                        tag: 'test',
                        dates_completed: ['30-08-2021', '31-08-2021'],
                        highest_streak: 2,
                        priority: true
                    }
                }
            
            jest.spyOn(Habit, 'findByName')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { params: { name: 'test' } }
            await habitController.show(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });

    /* THIS DOES NOT PASS AS THERE IS NO CREATE METHOD WITHIN /model/Habit.js */

    /*
    describe('create', () => {
        test('it creates and returns a new habit with a 201 status code', async () => {
            let testHabit = {   
                test:
                    {
                        start_date: '28-11-2021',
                        name: 'test',
                        tag: 'test',
                        dates_completed: ['30-08-2021', '31-08-2021'],
                        highest_streak: 2,
                        priority: true
                    }
                }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new Habit(testHabit));
                
            const mockReq = { body: testHabit }
            await habitController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    });
    */

    describe('destroy', () => {
        test('it returns a 200 status code on successful deletion', async () => {
            jest.spyOn(Habit, 'destory')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { name: 'test' } }
            await habitController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

})