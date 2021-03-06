const express = require('express');
const router = express.Router();
const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 10000
});

router.delete('/:id', (req, res) => {
    console.log('In /tasks DELETE');
    const queryText = `DELETE FROM "tasks" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in DELETE /tasks', error);
        res.sendStatus(500);
    })
})


// send updates of status to database
router.put('/:id', (req, res) => {
    console.log('In /tasks PUT');
    const queryText = `UPDATE "tasks" SET "completed" = not "completed" WHERE "id" = $1;`;
    pool.query(queryText, [req.params.id]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('Error in PUT /tasks', error);
        res.sendStatus(500);        
    })
})

// send new tasks to database
router.post('/', (req, res) => {
    console.log(('In /tasks POST'));
    const newTask = (req.body);
    const queryText = `INSERT INTO "tasks" ("task") VALUES ($1);`;
    pool.query(queryText, [newTask.task])
        .then((response) => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('Error in POST /tasks', error);
            res.sendStatus(500);            
        })
})


// get incomplete tasks from database
router.get('/hidden', (req, res) => {
    console.log('In /tasks/hidden GET');
    let queryText = `SELECT * FROM "tasks" WHERE "completed" = FALSE ORDER BY "task";`;
    pool.query(queryText).then((result) => {
        console.log(result);
        res.send(result.rows)  
    }).catch((error) => {
        console.log('Error in GET /tasks/hidden', error);
        res.sendStatus(500);
    })
    
});

// get all tasks from database
router.get('/', (req, res) => {
    console.log('In /tasks GET');
    let queryText = `SELECT * FROM "tasks" ORDER BY "task", "completed";`;
    pool.query(queryText).then((result) => {
        console.log(result);
        res.send(result.rows);        
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);        
    })
});




module.exports = router;