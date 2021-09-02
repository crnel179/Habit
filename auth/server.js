const express = require('express')
const cors = require('cors')
const { userRouter, tokenRouter } = require('./routes')

const server = express()

server.use(cors());
server.use(express.json());

server.use('/users', userRouter);
server.use('/tokens', tokenRouter);

module.exports = server;