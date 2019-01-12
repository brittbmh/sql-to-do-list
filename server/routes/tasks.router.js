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