const Email = require('../../../model/Email');
const { MongoClient } = require ('mongodb');
jest.mock('mongodb');

const db = require('../../../dbConfig');

/* cant really put tests in here because its basically just user but deeper */

describe('Email', () => {
    beforeEach(() => jest.clearAllMocks())

    afterAll(() => jest.resetAllMocks())
    
})