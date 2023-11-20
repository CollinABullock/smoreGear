// Middleware for verifying JWT token
const jwt = require('jsonwebtoken');

const requireUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded; // Attach user information to the request object
    next();
  });
};

module.exports = { requireUser };


// takes required parameters as an array, returns a middleware function that sends back a message if they're not present
const requiredNotSent = ({ requiredParams, atLeastOne = false }) => {
  return (req, res, next) => {
    // for operations that need at least one param. Not all required.
    if(atLeastOne) {
      let numParamsFound = 0;
      for(let param of requiredParams) {
        if(req.body[param] !== undefined) {
          numParamsFound++;
        }
      }
      if(!numParamsFound) {
        next({
          name: 'MissingParams',
          message: `Must provide at least one of these in body: ${requiredParams.join(', ')}`
        })
      } else {
        next();
      }
    } else {
      // figure out which ones are not defined, and return them
      const notSent = [];
      for(let param of requiredParams) {
        if(req.body[param] === undefined) {
          notSent.push(param);
        }
      }
      if(notSent.length) next({
        name: 'MissingParams',
        message: `Required Parameters not sent in body: ${notSent.join(', ')}`
      })
      next();
    }
  }
}

module.exports = {
  requireUser,
  requiredNotSent,
}