const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../controllers/auth');
exports.isAuth = (req, res, next) => {
  // console.log(req.headers);
  // console.log(req.get('Authorization'));
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    const error = new Error('No Authorization Header!');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if (!decodedToken) {
    const error = new Error('Not authenticated!');
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
