const users = require('./data');

module.exports = {
    get,
    getByUsername,
    insert
}

function get() {
    return Promise.resolve(users);
}

function getByUsername(username) {
    return Promise.resolve(users.find(user => user.username === username))
}

function insert(user) {
    users.push(user)
    return Promise.resolve(users[users.length - 1])
}
