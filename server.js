const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logger');
const authManager = require('./middleware/AuthManager');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const nunjucks = require('nunjucks');
const csurf = require('tiny-csrf');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 8000;

var app = express();

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true,
});

var fileStoreOptions = {};

app.use(logger);

app.use(
    session({
        secret: 'this is my secret',
        resave: false,
        saveUninitialized: false,
        store: new FileStore(fileStoreOptions),
    })
);
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser('cookie-parser-secret'));
app.use(csurf('123456789iamasecret987654321look'));

app.use(authManager);

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/member', require('./routes/member'));
app.use('/', require('./routes/post'));

app.use((req, res, next) => {
    res.status(404).send(nunjucks.render('error.html.njk'));
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
