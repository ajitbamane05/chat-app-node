const UserAccessor = require('../accessor/userAccessor')
const bcrypt = require('bcrypt')

async function createNewUser(username, email, password) {
    const existedUsername = await UserAccessor.findByUsername(username)
    if (existedUsername) {
        return { statusCode: 400, message: "Username already existed" }
    }
    const existedEmail = await UserAccessor.findByEmail(email)
    if (existedEmail) {
        return { statusCode: 400, message: "Email already existed" }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return UserAccessor.createNewUser(username, email, hashedPassword)
}

async function createAdmin(username, email, password) {
    const existedUsername = await UserAccessor.findByUsername(username)
    if (existedUsername) {
        return { statusCode: 400, message: "Username already existed" }
    }
    const existedEmail = await UserAccessor.findByEmail(email)
    if (existedEmail) {
        return { statusCode: 400, message: "Email already existed" }
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    return UserAccessor.createAdmin(username, email, hashedPassword)
}

function deleteUser(username) {
    return UserAccessor.deleteUser(username)
}


module.exports = {
    createNewUser, createAdmin, deleteUser
}