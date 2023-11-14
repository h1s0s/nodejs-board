const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const mysql = require('mysql2');
const dbconfig = require('./config/database.js');
const path = require('path');

dotenv.config();
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
const indexRouter = require('./src/routes');
const userRouter = require('./src/routes/user');
const boardRouter = require('./src/routes/board');

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie'
}));

// 라우터를 
app.use('/', indexRouter);
// app.use('/user', userRouter);
// app.use('/board', boardRouter);

app.use((req, res, next) => {
    console.log('모든 요청에 다 실행됩니다.');
    next();
})
app.get('/', (req, res, next) => {
    console.log('GET / 요청에 대해서만 실행됩니다.');
    next();
}, (req, res) => {
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((req, res, next) => {
    res.status(404).send("Not Found");
});
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

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