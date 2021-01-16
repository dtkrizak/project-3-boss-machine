const {
    addToDatabase,
    getAllFromDatabase,
    getFromDatabaseById,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');
const express = require('express');
const ideasRouter = express.Router();

//Middleware to check for single idea by id
ideasRouter.param('id', (req, res, next, id) => {
    //const ideaId = Number(req.params.id);
    const idea = getFromDatabaseById('ideas', id);
    
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send();
    }
    
});

//GET request to return array of ideas
ideasRouter.get('/', (req, res, next) => {
    const ideas = getAllFromDatabase('ideas');
    res.send(ideas);
    /*
    if (ideas) {
    } else {
        res.status(404).send('Ideas not found');
    }
    */
});

//POST request to add a new idea
ideasRouter.post('/', (req, res, next) => {
    //const newIdea = req.body.idea;
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
    /*
    //checks that the idea contains the required parameters in the required format
    if ((typeof newIdea.id === 'string') &&
        (typeof newIdea.name === 'string') &&
        (typeof newIdea.description === 'string') &&
        (typeof newIdea.numWeeks === 'number') &&
        (typeof newIdea.weeklyRevenue === 'number')) {
        const added = addToDatabase('ideas', newIdea);
        res.status(201).send(added, checkMillionDollarIdea(added));
        if (added) {
        } else {
            res.status(400).send('Idea not added to database');
        }
    } else {
        res.status(400).send('Invalid idea supplied');
    }
    */
});

//GET request to return single idea by id
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

//PUT request to update single idea by id
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
    /*
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
    */
});

//DELETE request to delete single idea by id
ideasRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.id);
    res.status(204).send();
    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
    /*
    if (req.idea.id && (typeof req.idea.id === 'number')) {
        //const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
        if (deleted) {
        } else {
            res.status(404).send('Idea not found');
        }
    } else {
        res.status(405).send('Invalid idea supplied');
    }
    
    */
});

module.exports = ideasRouter;