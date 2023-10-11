const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

function createNewSession(userId, token) {
    return prisma.session.create({
        data: {
            userId, token
        }
    })

}

function getSessionByKey(userId,token){
    return prisma.session.findFirst({
        where: {
            userId, token 
        }
    })
}

function removeSession(userId,token){
    return prisma.session.deleteMany({
        where:{
            userId,token
        }
    })
}


module.exports = { createNewSession, getSessionByKey, removeSession }