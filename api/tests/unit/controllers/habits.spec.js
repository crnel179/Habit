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
            jest.spyOn(Habit, 'all')
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
                        frequency: 1,
                        dayCount: {date: '01-09-21', completed: false, count:0},
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

    describe('create', () => {
        test('it creates and returns a new habit with a 201 status code', async () => {
            let testHabit = {   
                test:
                    {
                        start_date: '28-11-2021',
                        name: 'test',
                        tag: 'test',
                        dates_completed: ['30-08-2021', '31-08-2021'],
                        frequency: 1,
                        dayCount: {date: '01-09-21', completed: false, count:0},
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
    
    /* update test */

    describe('update', () => {
        test('it updates a current habit with a 200 status code', async () =>{
            let testHabit = {   
                test:
                    {
                        start_date: '28-11-2021',
                        name: 'test',
                        tag: 'test',
                        dates_completed: ['30-08-2021', '31-08-2021'],
                        frequency: 1,
                        dayCount: {date: '01-09-21', completed: false, count:0},
                        highest_streak: 2,
                        priority: true
                    }
                }

            jest.spyOn(Habit, 'update')
                .mockResolvedValue(new Habit(testHabit))

            const mockReq = { params: { name: 'test' } }
            await habitController.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    })


    /* update count test */

    describe('updateCount', () => {
        test('it updates a current habits streak count with a ? status code', async () =>{
            let testHabit = {   
                test:
                    {
                        start_date: '28-11-2021',
                        name: 'test',
                        tag: 'test',
                        dates_completed: ['30-08-2021', '31-08-2021'],
                        frequency: 1,
                        dayCount: {date: '01-09-21', completed: false, count:0},
                        highest_streak: 2,
                        priority: true
                    }
                }

            jest.spyOn(Habit, 'updateCount')
                .mockResolvedValue(new Habit(testHabit))

            const mockReq = { params: { name: 'test' } }
            await habitController.updateCount(mockReq, mockRes); //i dont believe this works because the try and catch function in updateCount is not complete
            expect(mockStatus).toHaveBeenCalledWith(200); 
            expect(mockJson).toHaveBeenCalledWith(new Habit(testHabit));
        })
    })


    describe('destroy', () => {
        test('it returns a 200 status code on successful deletion', async () => {
            jest.spyOn(Habit, 'destroy')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { name: 'test' } }
            await habitController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

})