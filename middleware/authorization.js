const jwt = require('jsonwebtoken');
const secret = process.env.SECRET

async function checkIfAuthorised(req, res, next) {
    const tokenString = req.headers['authorization']
    if (!tokenString) {
        return res.status(401).send("Please log in before accessing API");
    }
    const actualToken = tokenString.split(' ')[1]
    if (!actualToken) {
        return res.status(401).send("Please log in before accessing API");
    }
    let data = jwt.verify(actualToken, secret)
    if (data.isAdmin) {
        next()
    } else {
        return res.status(401).send({ message: "You are not authorised!" })
    }
}

async function authorisedSender(req, res, next) {
    const { senderId } = req.body;
    const tokenString = req.headers['authorization'];
    if (!tokenString) {
        return res.status(401).send("Logged out login before send messages!");
    }
    const actualToken = tokenString.split(' ')[1]
    if (!actualToken) {
        return res.status(401).send("Logged out login before send messages!");
    }
    let data = jwt.verify(actualToken, secret);
  
    if (senderId === data.user_id) {
        next()
    } else {
        return res.status(401).send({ message: "You are not authorised to send chat behalf of this user!" })
    }
}

module.exports = {
    checkIfAuthorised,
    authorisedSender
}