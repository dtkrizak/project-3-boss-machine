# project-4-boss-machine-start
Create an API using Express and SQL to serve information to an imaginary boss machine 

This project handles the routing for accessing and saving data focused inside the /server folder
    api.js encapsulates minionsRouter, ideasRouter, and meetingsRouter
    
    minionsRouter.js handles all the following requests:
    
        GET /api/minions to get an array of all minions
        POST /api/minions to create a new minion and save it to the database
        GET /api/minions/:minionId to get a single minion by id
        PUT /api/minions/:minionId to update a single minion by id
        DELETE /api/minions/:minionId to delete a single minion by id
        
        GET /api/minions/:minionId/work to get an array of all work for the specified minon
        POST /api/minions/:minionId/work to create a new work object and save it to the database
        PUT /api/minions/:minionId/work/:workId to update a single work by id
        DELETE /api/minions/:minionId/work/:workId to delete a single work by id

    ideasRouter.js handles all the following requests:
    
        GET /api/ideas to get an array of all ideas
        POST /api/ideas to create a new idea and save it to the database
        GET /api/ideas/:ideaId to get a single idea by id
        PUT /api/ideas/:ideaId to update a single idea by id
        DELETE /api/ideas/:ideaId to delete a single idea by id

    meetingsRouter.js handles the following requests:
    
        GET /api/meetings to get an array of all meetings
        POST /api/meetings to create a new meeting and save it to the database
        DELETE /api/meetings to delete all meetings from the database
