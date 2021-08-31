const express = require('express')
const cors = require('cors')
const requestRoutes = require('./habitRoutes')

const server = express()

server.use(cors());
server.use(express.json());

server.use('/habits', requestRoutes)

server.get('/', (req, res) => res.send('hello world'));

module.exports = server;