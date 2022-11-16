const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('post/list.html.njk');
});

module.exports = router;
