// recuperation et validation token
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET')
    const userId = decodedToken.userId
    const email = decodedToken.email;
    console.log('id from Auth')
    console.log(userId)
    req.auth = { userId, email, isAdmin: email === "marwanecompany@gmail.com"}
    next()
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};