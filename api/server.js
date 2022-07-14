const express = require('express');
const server = express();
const Users = require('./users-model');
const { validateNewUser, validatePassword } = require('./middleware')

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>The Server Is Online</h1>`)
})

server.get('/api/users', (req, res, next) => {
    Users.get()
        .then(users => res.json(users))
        .catch(next)
})

server.post('/api/register', validateNewUser, (req, res, next) => {
    Users.insert(req.body)
        .then(user => res.status(201).json(user))
        .catch(next)
})

server.post('/api/login', validatePassword, (req, res, next) => {
    res.json({message: "Welcome to our website!"})
})

server.use((error, req, res, next) => {
    res.status(error.status || 500).json({message: error.message || "internal server error"})
})

module.exports = server;
