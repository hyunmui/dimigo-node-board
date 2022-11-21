// 기본 모듈
const express = require('express');
const path = require('path');

// view template engine
const nunjucks = require('nunjucks');

// 로그인 구현 관련
const session = require('express-session');
var FileStore = require('session-file-store')(session);

// csrf protection
const cookieParser = require('cookie-parser');
const csurf = require('tiny-csrf');

// 커스텀 미들웨어
const { logger } = require('./middleware/logger');
const authManager = require('./middleware/AuthManager');

const PORT = process.env.PORT || 8000;

// app
var app = express();

// template engine configuration
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true,
});

var fileStoreOptions = {};

/** 1. internal middleware */
app.use(express.urlencoded({ extended: false })); // url-encoding for unicode
app.use(express.json());
app.use('/', express.static(path.join(__dirname, 'public')));

/** 2. external middleware by npm / yarnpkg */
// 2-1. 세션 설정
app.use(
    session({
        secret: 'this is my secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore(fileStoreOptions),
    })
);

// tiny-csrf 사용하는데 필요
app.use(cookieParser('cookie-parser-secret'));
// 2-2. csrf tokenizer
app.use(csurf('123456789iamasecret987654321look'));

/** 3. custom middleware */
app.use(logger);
app.use(authManager);

// add router WITH MVC
app.use('/', require('./routes/root'));
app.use('/', require('./routes/post'));
app.use('/member', require('./routes/member'));

// 404 Page Not Found
app.use('*', (req, res, next) => {
    res.status(404).send(nunjucks.render('error/404.html.njk'));
});

// 500 Internal Server Error
app.use((err, req, res, next) => {
    res.status(500).send(nunjucks.render('error/500.html.njk'));
});

// app start
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
