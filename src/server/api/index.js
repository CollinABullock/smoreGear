const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;
const client = require('../db/client');
const volleyball = require('volleyball')
apiRouter.use(volleyball)

apiRouter.post('/', async (req, res, next) => {
  try {
    const uptime = process.uptime();
    const {rows: [dbConnection]} = await client.query('SELECT NOW();');
    const currentTime = new Date();
    const lastRestart = new Intl.DateTimeFormat('en', {timeStyle: 'long', dateStyle: 'long', timeZone: "America/Los_Angeles"}).format(currentTime - (uptime * 1000));
    res.send({message: 'healthy', uptime, dbConnection, currentTime, lastRestart});
  } catch (err) {
    next(err);
  }
});
// TO BE COMPLETED - set `req.user` if possible, using token sent in the request header
apiRouter.use(async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');
  
  if (!auth) { // nothing to see here
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    
    try {
      const parsedToken = jwt.verify(token, JWT_SECRET);
      
      const id = parsedToken && parsedToken.id
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${ prefix }`
    });
  }
});
// apiRouter.use(async (req, res, next) => {
//   const prefix = 'Bearer ';
//   const auth = req.header('Authorization');
  
//   if (!auth) { 
//     next();
//   } 
//   else if (auth.startsWith(prefix)) {
//     // TODO - Get JUST the token out of 'auth'
//     const token = auth.slice(prefix.length);
    
//     try {
//       const { id } = jwt.verify(token, JWT_SECRET);
//       if (id) {
//         req.user = await getUserById(id);
//         next();
//       } else {
//         next({
//           name: 'AuthorizationHeaderError',
//           message: 'Authorization token malformed',
//         });
//       }
//     } catch  ({ name, message }) {
//       next({ name, message });
//     }
//   } else {
//     next({
//       name: 'AuthorizationHeaderError',
//       message: `Authorization token must start with ${prefix}`
//     });
//   }
// });
const usersRouter = require('./users');

apiRouter.use('/users', usersRouter);
// apiRouter.use('/users', usersRouter);

const productsRouter = require('./products');
apiRouter.use('/products', productsRouter);

apiRouter.use((err, req, res, next) => {
    res.status(500).send(err)
  })
module.exports = apiRouter;