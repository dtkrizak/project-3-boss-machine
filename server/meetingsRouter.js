const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');
const express = require('express');
const meetingsRouter = express.Router();

module.exports = meetingsRouter;

//use morgan for logging
//const morgan = require('morgan');
//meetingsRouter.use(morgan('dev'));

//GET request to return array of meetings
meetingsRouter.get('/', (req, res, next) => {
    let meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
    } else {
        res.status(404).send('Meetings not found');
    }
});

//POST request to add a new meeting
meetingsRouter.post('/', (req, res, next) => {
    let newMeeting = addToDatabase('meetings', createMeeting());
    if (newMeeting) {
        res.status(201).send(newMeeting);
    } else {
        res.status(400).send();
    }
});

//DELETE request to delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
    /*
    if(!meetings){
    } else {
        res.status(404).send('Meetings not found');
    }
    */
});
