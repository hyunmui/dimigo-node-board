const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.urlencoded({ extended: false })); // #1
app.use('/', express.static(path.join(__dirname, 'public'))); // #2
app.use('/', (req, res) => {
    console.log('request body ', req.body);
    res.status(200).send('Hello Express!');
});
app.listen(PORT, () => console.log(`startup to http://localhost:${PORT}`));
