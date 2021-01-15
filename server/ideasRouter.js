const router = require('express').Router();
import getAllFromDatabase from './db';
import getFromDatabaseById from './db';
import addToDatabase from './db';
import updateInstanceInDatabase from './db';
import deleteFromDatabasebyId from './db';
import checkMillionDollarIdea from './checkMillionDollarIdea';

//use morgan for logging
const morgan = require('morgan');
router.use(morgan('dev'));

//Middleware to check for single idea by id
router.param('ideaId', (req, res, next, id) => {
    const ideaId = Number(req.params.id);
    const idea = getFromDatabaseById('ideas', ideaId);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('Idea not found');
    }
});

//GET request to return array of ideas
router.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
        res.send(ideas);
    } else {
        res.status(404).send('Ideas not found');
    }
});

//POST request to add a new idea
router.post('/', (req, res, next) => {
    const newIdea = req.body.idea;
    //checks that the idea contains the required parameters in the required format
    if ((typeof newIdea.id === 'string') &&
        (typeof newIdea.name === 'string') &&
        (typeof newIdea.description === 'string') &&
        (typeof newIdea.numWeeks === 'number') &&
        (typeof newIdea.weeklyRevenue === 'number')) {
        const added = addToDatabase('ideas', newIdea);
        if (added) {
            res.status(201).send(added, checkMillionDollarIdea(added));
        } else {
            res.status(400).send('Idea not added to database');
        }
    } else {
        res.status(400).send('Invalid idea supplied');
    }
});

//GET request to return single idea by id
router.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

//PUT request to update single idea by id
router.put('/:ideaId', (req, res, next) => {
    const idea = req.body.idea
    if(idea.id && (typeof idea.id === 'string')){
        const updated = updateInstanceInDatabase('ideas', idea);
        if(updated){
            res.send(updated);
        } else {
            res.status(400).send('Idea not updated');
        }
    } else {
        res.status(400).send('Invalid idea supplied');
    }
});

//DELETE request to delete single idea by id
router.delete('/:ideaId', (req, res, next) => {
    if (req.idea.id && (typeof req.idea.id === 'string')) {
        const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).send('Idea not found');
        }
    } else {
        res.status(400).send('Invalid idea supplied');
    }
});

module.exports = router;