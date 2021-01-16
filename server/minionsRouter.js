const { 
    getAllFromDatabase, 
    getFromDatabaseById, 
    addToDatabase, 
    updateInstanceInDatabase, 
    deleteFromDatabasebyId 
} = require('./db');
const express = require('express');
const minionsRouter = express.Router({ mergeParams: true });

//use morgan for logging
//const morgan = require('morgan');
//minionsRouter.use(morgan('dev'));

//Middleware to check for single minion by id
minionsRouter.param('minionId', (req, res, next, id) => {
    //const minionId = Number(id);
    //req.params.id
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
    /* 
    if(minions){
    }else{
        res.status(404).send('Minions not found');
    }
    */
});

//POST request to add a new minion
minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    res.status(201).send(newMinion);
    /*
    //const newMinion = req.body.minion;
    
    //need to check that newMinion contains id, name, title, and salary
    if((typeof newMinion.id === 'string') && 
        (typeof newMinion.name === 'string') && 
        (typeof newMinion.title === 'string') && 
        (typeof newMinion.salary === 'number')){
        const added = addToDatabase('minions', newMinion);
        if(added){
        } else {
            res.status(400).send('Minion not added to database');
        }
    } else {
        res.status(400).send('Invalid minion supplied');
    }
    */
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
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();

});

module.exports = minionsRouter;

