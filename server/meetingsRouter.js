const router = require('express').Router();
import getAllFromDatabase from './db';
import deleteAllFromDatabase from './db';
import createMeeting from './db';

//use morgan for logging
const morgan = require('morgan');
router.use(morgan('dev'));

//GET request to return array of meetings
router.get('/', (req, res, next) => {
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
        res.send(meetings);
    } else {
        res.status(404).send('Meetings not found');
    }
});

//POST request to add a new meeting
router.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    if (newMeeting) {
        meetings.push(newMeeting);
        res.status(201).send(newMeeting);
    } else {
        res.status(400).send();
    }
});

//DELETE request to delete all meetings
router.delete('/:meetingId', (req, res, next) => {
    const meetings = deleteAllFromDatabase('meetings');
    if(!meetings){
        res.status(204).send();
    } else {
        res.status(404).send('Meetings not found');
    }
});

module.exports = router;