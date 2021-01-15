const express = require('express');
//const app = require('../server');
const apiRouter = express.Router();

//use morgan for logging 
//const morgan = require('morgan');
//apiRouter.use(morgan('dev'));

//adding the minionsRouter to the api
const minionsRouter = require('./minionsRouter');
apiRouter.use('/minions', minionsRouter);

//adding the ideasRouter to the api
const ideasRouter = require('./ideasRouter');
apiRouter.use('/ideas', ideasRouter);

//adding the meetingsRouter to the api
const meetingsRouter = require('./meetingsRouter');
apiRouter.use('/meetings', meetingsRouter);


module.exports = apiRouter;