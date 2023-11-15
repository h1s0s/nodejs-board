const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const { sequelize } = require('./models');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
sequelize.sync()
.then(() => {
    console.log('데이터베이스 연결 성공');
})
.catch((err) => {
    console.error(err);
})

//force : 서버 실행 시 마다 테이블을 재생성 할 것인지 아닌지
sequelize.sync({force: false})
    .then(()=>{
        console.log("DB Connected Success");
    })
    .catch((err)=> {
        console.error(err);
    });

// 라우터 정의
const indexRouter = require('./routes');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');

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
app.use('/board', boardRouter);

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
