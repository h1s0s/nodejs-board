const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

/**
 * 메인페이지
 */
router.get('/', (req, res) => {
    const query = 'SELECT * FROM boards';

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // 쿼리 결과를 JSON 형식으로 응답
        res.render('board/board', { results });
    });
});

module.exports = router;