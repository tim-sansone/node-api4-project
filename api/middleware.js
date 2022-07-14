const users = require('./data');
const { getByUsername } = require('./users-model')

module.exports = {
    validateNewUser,
    validatePassword
}

function validateNewUser(req, res, next) {
    if(!req.body.username || !req.body.password){
        next({status: 404, message: "Please enter a username and password"})
        return
    }
    next()
}

async function validatePassword(req, res, next) {
    try{
        const user = await getByUsername(req.body.username);
        if(user == null){
            next({status: 404, message: "User does not exist"})
            return
        }
        if(req.body.password !== user.password){
            next({status: 401, message: "Invalid password"})
            return
        }
    } catch(err) {
        next(err)
        return
    }
    next()
}
