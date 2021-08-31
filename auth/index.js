require('dotenv').config();

const express = require('express');
const cors = require('cors');
const Connection = require('./dbConfig');
const router = require('./router');

const app = express();
app.use(cors());
app.use(express.json());
app.use('', router);

Connection.open()
    .then(app.listen(process.env.PORT));

module.exports = app;