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

router.get('/', (req, res) => {
    console.log('In /tasks GET');
    let queryText = `SELECT * FROM "tasks" ORDER BY "tasks";`;
    pool.query(queryText).then((result) => {
        console.log(result);
        res.send(result.rows);        
    }).catch((error) => {
        console.log('Error in GET /tasks', error);
        res.sendStatus(500);        
    })
});




module.exports = router;