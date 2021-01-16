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
});

//POST request to add a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    res.status(201).send(newIdea);
});

//GET request to return single idea by id
ideasRouter.get('/:id', (req, res, next) => {
    res.send(req.idea);
});

//PUT request to update single idea by id
ideasRouter.put('/:id', checkMillionDollarIdea, (req, res, next) => {
    let updatedIdea = updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
});

//DELETE request to delete single idea by id
ideasRouter.delete('/:id', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.id);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = ideasRouter;