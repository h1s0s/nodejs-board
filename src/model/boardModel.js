const mysql = require('mysql2');
const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);

/**
 * @function getAllBoards
 * @description 게시글 조회
 * @param {function} callback
 */
function getAllBoards(callback) {
    const query = 'SELECT * FROM boards';
    connection.query(query, callback);
}

/**
 * @function createBoard
 * @description 게시글 생성
 * @param {function} boardData
 */
function createBoard(boardData) {
    //생성로직 넣기
}

/**
 * @function updateBoard
 * @description 게시글 수정
 * @param {function} boardData
 */
function updateBoard(boardData) {
    //생성로직 넣기
}

/**
 * @function deleteBoard
 * @description 게시글 삭제
 * @param {function} boardData
 */
function deleteBoard(boardNo) {
    //생성로직 넣기
}



module.exports = {
    getAllBoards,
    createBoard,
    updateBoard,
    deleteBoard
};