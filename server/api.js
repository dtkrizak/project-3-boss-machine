const express = require('express');
const app = require('../server');
const apiRouter = express.Router();

//use morgan for logging 
const morgan = require('morgan');
app.use(morgan('dev'));

//adding the minionsRouter to the api
const minionsRouter = require('./minionsRouter');
app.use('/api/minions', minionsRouter);

//adding the ideasRouter to the api
const ideasRouter = require('./ideasRouter');
app.use('/api/ideas', ideasRouter);

//adding the meetingsRouter to the api
const meetingsRouter = require('./meetingsRouter');
app.use('/api/meetings', meetingsRouter);

module.exports = apiRouter;
