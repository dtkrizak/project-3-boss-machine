const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const express = require('express');
const minionsRouter = express.Router({ mergeParams: true });

//use morgan for logging
//const morgan = require('morgan');
//minionsRouter.use(morgan('dev'));

//Middleware to check for single minion by id
minionsRouter.param('minionId', (req, res, next, id) => {
    const minionId = Number(id);
    const minion = getFromDatabaseById('minions', minionId);
    req.minion = minion;
    next();
    /*
    if(minion){
    } else {
        res.status(404).send('Minion not found');    
    }
    */
});

//GET request to return array of minions
minionsRouter.get('/', (req, res, next) => {
    const minions = getAllFromDatabase('minions');
    res.status(200).send(minions);
    /* 
    if(minions){
    }else{
        res.status(404).send('Minions not found');
    }
    */
});

//POST request to add a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = req.body.minion;
    //need to check that newMinion contains id, name, title, and salary
    if((typeof newMinion.id === 'string') && 
        (typeof newMinion.name === 'string') && 
        (typeof newMinion.title === 'string') && 
        (typeof newMinion.salary === 'number')){
        const added = addToDatabase('minions', newMinion);
        res.status(201).send(newMinion);
        /*
        if(added){
        } else {
            res.status(400).send('Minion not added to database');
        }
        */
    } else {
        res.status(400).send('Invalid minion supplied');
    }
});

//GET request to return single minion by id
minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

//PUT request to update single minion by id
minionsRouter.put('/:minionId', (req, res, next) => {
    const minion = req.body.minion
    if (minion.id && (typeof minion.id === 'string')) {
        const updated = updateInstanceInDatabase('minions', minion);
        if (updated) {
            res.send(updated);
        } else {
            res.status(400).send('Minion not updated');
        }
    } else {
        res.status(400).send('Invalid minion supplied');
    }
});

//DELETE request to delete single minion by id
minionsRouter.delete('/:minionId', (req, res, next) => {
    if (req.minion.id && (typeof req.minion.id === 'string')){
        const deleted = deleteFromDatabasebyId('minions', req.minion.id);
        if(deleted){
            res.status(204).send();
        } else {
            res.status(404).send('Minion not found')
        }
    } else {
        res.status(400).send('Invalid minion supplied');
    }
});

module.exports = minionsRouter;

