const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

function createNewUser(username, email, password) {
    return prisma.user.create({
        data: {
            username, email, password
        }
    })
}

function createAdmin(username, email, password) {
    return prisma.user.create({
        data: {
            username, email, password, isAdmin: true
        }
    })
}

function deleteUser(username) {
    return prisma.user.delete({
        where: {
            username: username
        }
    })
}

function findByUsername(username) {
    return prisma.user.findUnique({
        where: {
            username
        }
    })
}
function findByEmail(email) {
     return prisma.user.findUnique({
        where: {
            email
        }
    })
}

module.exports = {
    createNewUser, createAdmin, deleteUser, findByUsername,findByEmail
}