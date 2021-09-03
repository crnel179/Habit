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




})