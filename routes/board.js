const express = require('express');
const User = require('../models/user');
const Board = require('../models/board');
const router = express.Router();

/**
 * @route GET /board
 * @description 게시글 목록 조회, 렌더링
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
 * @route POST /board
 * @description 게시글 작성
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
 * @route PATCH /board
 * @description 게시글 수정
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
 * @route DELETE /board
 * @description 게시글 삭제
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