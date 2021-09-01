const request = require('supertest');
const fs = require("fs");
const { Pool } = require('mongodb'); //unsure if this is a legal function, may need revisions
const app = require('../../server');

const testSeed = fs.readFileSync(__dirname + '/test_seeds.js').toString();

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try {
            const db = new Pool()
            await db.query(testSeed);
            resolve('Test DB reset');
        } catch {
            reject(`Test DB could not be reset: ${err} in ${err.file}`);
        };
    });
}