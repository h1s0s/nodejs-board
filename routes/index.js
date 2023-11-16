const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /:
 *   get:
 *     summary: 타이틀 화면
 *     responses:
 *       200:
 *         description: 타이틀 화면 접속 성공
 *         content:
 *           text/plain:
 *             example: Hello
 */
router.get('/', (req, res) => {
    res.send('Hello');
});

module.exports = router;
