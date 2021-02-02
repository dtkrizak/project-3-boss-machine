const { 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase, 
    updateInstanceInDatabase, 
    deleteFromDatabasebyId 
} = require('./db');
const express = require('express');
const minionsRouter = express.Router();

//Middleware to check for single minion by id
minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send();    
    }
});

//GET request to return array of minions
minionsRouter.get('/', (req, res, next) => {
    let minions = getAllFromDatabase('minions');
    res.send(minions);
});

//POST request to add a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
});

//GET request to return single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//PUT request to update single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    let updatedMinion = updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
});

//DELETE request to delete single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});


//Middleware to check for single work by id
minionsRouter.param('workId', (req, res, next, id) => {
    const work = getFromDatabaseById('work', id);
    if (work) {
        req.work = work;
        next();
    } else {
        res.status(404).send();
    }
});

//GET request to return array of works
minionsRouter.get('/:minionId/work', (req, res, next) => {
    let work = getAllFromDatabase('work').filter((singleWork) => {
        return singleWork.minionId === req.params.minionId;
    });;
    res.send(work);
});

//POST request to add a new work
minionsRouter.post('/:minionId/work', (req, res, next) => {
    const workToAdd = req.body;
    workToAdd.minionId = req.params.minionId;
    const createdWork = addToDatabase('work', workToAdd);
    res.status(201).send(createdWork);
});

//PUT request to update single work by id
minionsRouter.put('/:mnionId/work/:workId', (req, res, next) => {
    if (req.params.minionId !== req.body.minionId) {
        res.status(400).send();
    } else {
        let updatedWork = updateInstanceInDatabase('work', req.body);
        res.send(updatedWork);
    }
});

//DELETE request to delete single work by id
minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('work', req.params.workId);
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(500).send();
    }
});

module.exports = minionsRouter;

