const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const dbconfig = require('./config/database.js');

const app = express();
const port = 3000;

// MySQL 연결 풀 생성
const pool = mysql.createPool(dbconfig);

// EJS 템플릿 엔진 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// MySQL 미들웨어
app.use((req, res, next) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error getting MySQL connection:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        // req 객체에 connection을 추가하여 라우터에서 사용할 수 있도록 함
        req.mysql = connection;

        // 다음 미들웨어 또는 라우터로 이동
        next();
    });
});

// 라우터 정의
const globalRouter = require('./src/routers/globalRouter.js');
// const userRouter = require('./routers/userRouter');
const boardRouter = require('./src/routers/boardRouter.js');

// 라우터를 Express 애플리케이션에 등록
app.use('/', globalRouter);
// app.use('/users', userRouter);
app.use('/board', boardRouter);

// 서버 시작
app.listen(port, () => {
    console.log(`Connected ${port} port`);
});

// MySQL 연결 종료를 위한 이벤트 리스너 추가
process.on('SIGINT', () => {
    pool.end((err) => {
        if (err) {
            console.error('Error closing MySQL connection pool:', err);
            process.exit(1);
        }
        console.log('MySQL connection pool closed.');
        process.exit(0);
    });
});