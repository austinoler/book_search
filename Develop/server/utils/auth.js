const jwt = require('jsonwebtoken');

// set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    let token = req.headers.authorization || '';

    if (token) {
      try {
        const decoded = jwt.verify(token, secret);
        return decoded;
      } catch (err) {
        console.log(err);
      }
    }
    throw new Error('Not authenticated');
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
