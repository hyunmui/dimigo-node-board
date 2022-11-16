const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log(req.session.loginMember);
    res.render('post/list.html.njk');
});

module.exports = router;
