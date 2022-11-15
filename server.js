const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const PORT = process.env.PORT || 8000;

nunjucks.configure('views', {
    autoescape: true,
    express: app,
});

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.render('posts/index.html.njk', { user: { name: 'John' } });
});

app.get('/login', function (req, res) {
    res.render('login.html.njk');
});

app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
