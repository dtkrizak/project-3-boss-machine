const router = require('express').Router();
import getAllFromDatabase from './db';
import getFromDatabaseById from './db';
import addToDatabase from './db';
import updateInstanceInDatabase from './db';
import deleteFromDatabasebyId from './db';

//use morgan for logging
const morgan = require('morgan');
router.use(morgan('dev'));

//Middleware to check for single work by id
router.param('workId', (req, res, next, id) => {
    const workId = Number(req.params.id);
    const work = getFromDatabaseById('work', workId);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send('Work not found');
    }
});

//GET request to return array of works
router.get('/', (req, res, next) => {
    const works = getAllFromDatabase('work');
    if (works) {
        res.send(works);
    } else {
        res.status(404).send('Works not found');
    }
});

//POST request to add a new work
router.post('/', (req, res, next) => {
    const newWork = req.body.work;
    //need to check that newWork contains id, name, title, and salary
    if ((typeof newWork.id === 'string') &&
        (typeof newWork.title === 'string') &&
        (typeof newWork.description === 'string') &&
        (typeof newWork.hours === 'number') &&
        (typeof newWork.minionId === 'string')) {
        const added = addToDatabase('work', newWork);
        works.push(newWork);
        if (added) {
            res.status(201).send(added);
        } else {
            res.status(400).send('Work not added to database');
        }
    } else {
        res.status(400).send('Invalid work supplied');
    }
});

//GET request to return single work by id
router.get('/:workId', (req, res, next) => {
    res.send(req.work);
});

//PUT request to update single work by id
router.put('/:workId', (req, res, next) => {
    const work = req.body.work
    if (work.id && (typeof work.id === 'string')) {
        const updated = updateInstanceInDatabase('work', work);
        if (updated) {
            res.send(updated);
        } else {
            res.status(400).send('Work not updated');
        }
    } else {
        res.status(400).send('Invalid work supplied');
    }
});

//DELETE request to delete single work by id
router.delete('/:workId', (req, res, next) => {
    if (req.work.id && (typeof req.work.id === 'string')) {
        const deleted = deleteFromDatabasebyId('work', req.work.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Work not found')
        }
    } else {
        res.status(400).send('Invalid work supplied');
    }
});

module.exports = router;