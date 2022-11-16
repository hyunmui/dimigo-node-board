const express = require('express');
const path = require('path');
const { logger } = require('./middleware/logger');
const authManager = require('./middleware/AuthManager');
const session = require('express-session');
var FileStore = require('session-file-store')(session);
const nunjucks = require('nunjucks');
const PORT = process.env.PORT || 8000;

var app = express();

const env = nunjucks.configure('views', {
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

app.use(authManager);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));
app.use('/member', require('./routes/member'));

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
