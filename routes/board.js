const express = require('express');
const User = require('../models/user');
const Board = require('../models/board');
const router = express.Router();

/**
 * @route GET /board
 * @description 게시글 목록 조회, 렌더링
 */
router.get('/board', async (req, res, next) => {
    try {
        const boards = await Board.findAll();
        res.render('board', { boards });
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * @route POST /board
 * @description 게시글 작성
 */
router.post('/board', async (req, res, next) => {
    try {
        const board = await Board.create({
            content : req.body.content,
            boardPw : req.body.boardPw
        });
        console.log(board);
        res.status(201).json(board);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * @route PATCH /board
 * @description 게시글 수정
 */
router.patch('/board', async (req, res, next) => {
    try {
        const board = await Board.update({
            content : req.body.content,
            boardPw : req.body.boardPw
        }, {
            where : { boardNo : req.body.boardNo }
        });
        console.log(board);
        res.status(201).json(board);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

/**
 * @route DELETE /board
 * @description 게시글 삭제
 */
router.delete('/board', async (req, res, next) => {
    try {
        const board = await Board.destory({
            where : { boardNo : req.body.boardNo }
        });
        console.log(board);
        res.status(201).json(board);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;