const jwt = require('jwt-simple');
const {secret} = require('./config')
module.exports = (req, res, next) => {
  let authorization = req.headers['authorization'];
  if (authorization) {
    try {
      // 过期时间它会自己判断
      let decoded = jwt.decode(authorization.split(' ')[1], secret);
      req.user = decoded.user;
      next();
    } catch (err) {
      res.status(401).send('Not Allowed'); // 无权访问
    }
  } else {
    res.status(401).send('Not Allowed'); // 无权访问
  }
}