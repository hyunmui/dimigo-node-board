const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const logger = require('./middleware/logger');

const PORT = process.env.PORT || 8000;

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use(logger);

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/member', require('./routes/member'));

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
