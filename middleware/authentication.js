const jwt = require('jsonwebtoken');
const SessionAccessor = require('../accessor/sessionAccessor');
const secret = process.env.SECRET
async function checkIfAuthenticated(req, res, next) {
    const tokenString = req.headers['authorization']
    if (!tokenString) {
        return res.status(401).send("Please log in before accessing API");
    }
    const actualToken = tokenString.split(' ')[1]
    if (!actualToken) {
        return res.status(401).send("Please log in before accessing API");
    }
    let data = jwt.verify(actualToken, secret)
   
    let user_id = data['user_id']
    const session = await SessionAccessor.getSessionByKey(user_id, actualToken)
    if (session) {
        next()
    }
    else {
        return res.status(401).send('Could not find session for you login again!')
    }
}

module.exports ={
    checkIfAuthenticated
}