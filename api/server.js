const express = require('express')
const cors = require('cors')
const requestRoutes = require('./habitRoutes')
const { userRouter, tokenRouter } = require('./authRoutes')
const check = require('./middleware');

const server = express()

server.use(cors());
server.use(express.json());

server.use('/habits', requestRoutes);
server.use('/users', userRouter);
server.use('/tokens', tokenRouter);

module.exports = server;