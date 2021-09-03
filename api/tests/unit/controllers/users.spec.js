const userController = require('../../../controllers/users')
const User = require('../../../model/User');

const mockSend = jest.fn();
const mockJson = jest.fn();
const mockStatus = jest.fn(code => ({ send: mockSend, json: mockJson, end: jest.fn() }))
const mockRes = { status: mockStatus }

/* none of these will run because testing doesnt like bcrypt 
    but at this point im just writing them for completion purposes */

describe('users controller', () => {
    beforeEach(() => jest.clearAllMocks());

    afterAll(() => jest.resetAllMocks());

    describe('get by username', () => {
        test('it returns a user with a 201 status code', async() => {
            let testUser = {
                test:
                    {
                        user_email: 'test@email.com',
                        pseudoname: 'test',
                        password: 'test123',
                        verification: 1
                    }
                }
            jest.spyOn(User, 'getAll')
                .mockResolvedValue(new User(testUser))

            const mockReq = { params: { name: 'test' } }
            await User.findByUserName(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    })

    describe('create', () => {
        test('it creates a new user with a 201 status code', async () => {
            let testUser = {   
                test:
                    {
                        user_email: 'test@email.com',
                        pseudoname: 'test',
                        password: 'test123',
                        verification: 1
                    }
                }
            jest.spyOn(Habit, 'create')
                .mockResolvedValue(new User(testUser));
                
            const mockReq = { params: { name: 'test' } }
            await userController.create(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    });

    describe('update', () => {
        test('it updates a current user with a 200 status code', async () =>{
            let testUser = {   
                test:
                    {
                        user_email: 'test@email.com',
                        pseudoname: 'test',
                        password: 'test123',
                        verification: 1
                    }
                }

            jest.spyOn(User, 'update')
                .mockResolvedValue(new User(testUser))

            const mockReq = { params: { name: 'test' } }
            await userController.update(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith(new User(testUser));
        })
    })

    describe('destroy', () => {
        test('it returns a 200 status code on successful deletion', async () => {
            jest.spyOn(User, 'destroy')
                .mockResolvedValue('Deleted');
            
            const mockReq = { params: { name: 'test' } }
            await userController.destroy(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });


    describe('exists', () => {
        test('it returns if an email exists in the database', async () => {
            let testUser = {   
                test:
                    {
                        user_email: 'test@email.com',
                        pseudoname: 'test',
                        password: 'test123',
                        verification: 1
                    }
                }

            jest.spyOn(User, 'exists')
                .mockResolvedValue(User(testUser));
            
            const mockReq = { params: { name: 'test' } }
            await habitController.exists(mockReq, mockRes);
            expect(mockStatus).toHaveBeenCalledWith(200);
        })
    });

    

})