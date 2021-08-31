const request = require('supertest');
const fs = require("fs");
const { Pool } = require('pg');
const Connection = require('../../dbConfig');

const testSeed = fs.readFileSync(__dirname + '/test_seeds.json').toString();

const resetTestDB = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // Open test database connection
            await Connection.open(true);
            await Connection.db.query(
                seedTestDatabase(schema, testSeed)
            );
            resolve('Test DB reset');
        } catch (err) {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}

const seedTestDatabase = (schema, entries) => {

}

module.exports = resetTestDB;