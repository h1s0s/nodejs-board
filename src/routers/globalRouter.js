const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

/**
 * 메인 페이지
 */
router.get('/', (req, res) => {
    res.send('<a href="/board">게시판으로 이동하기</a>');
});

module.exports = router;