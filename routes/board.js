const express = require('express');
const User = require('../models/user');
const Board = require('../models/board');
const router = express.Router();

/**
 * @swagger
 * /board:
 *   get:
 *     summary: 게시글 조회
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 조회
 *         content:
 *           application/json:
 *             example:
 *               results: []
 */
router.get('/', async (req, res, next) => {
    try {
        const boards = await Board.findAll();
        res.render('board/board', { results: boards })
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * @swagger
 * /board:
 *   post:
 *     summary: 게시글 작성
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             data:
 *               userNo: '회원 번호'
 *               content: '게시글 내용'
 *               boardPw: '게시글 번호'
 *     responses:
 *       201:
 *         description: 성공적으로 게시글 작성
 *         content:
 *           application/json:
 *             example:
 *               board: {}
 */
router.post('/', async (req, res, next) => {
    try {
        const board = await Board.create({
            userNo : req.body.data.userNo,
            content : req.body.data.content,
            boardPw : req.body.data.boardPw,
        });
        console.log(board);
        res.status(201).json(board);
    } catch (err) {
        console.error("error:"+err);
        next(err);
    }
});

/**
 * @swagger
 * /board:
 *   patch:
 *     summary: 게시글 수정
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             data:
 *               boardNo: 1
 *               content: '게시글 내용'
 *               boardPw: '게시글 비밀번호'
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 수정
 *       404:
 *         description: 비밀번호가 틀려서 실패
 */
router.patch('/', async (req, res, next) => {
    try {
        const result = await Board.update({
            content : req.body.data.content,
        }, {
            where : { boardNo : req.body.data.boardNo, boardPw : req.body.data.boardPw }
        });
        if (result === 0) {
            res.status(404).json({ message: '게시글이 없습니다.' });
        } else {
            res.status(200).json({ message: '게시글이 수정되었습니다.' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * @swagger
 * /board:
 *   delete:
 *     summary: 게시글 삭제
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             data:
 *               boardNo: '게시글 번호'
 *               boardPw: '게시글 비밀번호'
 *     responses:
 *       200:
 *         description: 성공적으로 게시글 삭제
 *       404:
 *         description: 비밀번호가 틀려서 실패
 */
router.delete('/', async (req, res, next) => {
    try {
        const result = await Board.destroy({
            where : { boardNo : req.body.data.boardNo, boardPw: req.body.data.boardPw}
        });
        if (result === 0) {
            res.status(404).json({ message: '게시글이 없습니다.' });
        } else {
            res.status(200).json({ message: '게시글이 삭제되었습니다.' });
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;