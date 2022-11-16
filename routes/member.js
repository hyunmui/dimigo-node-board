const express = require('express');
const router = express.Router();
const memberController = require('../controllers/MemberController');

router.route('/login').get(memberController.pageLogin).post(memberController.doLogin);
router.route('/register').get(memberController.pageRegister);

module.exports = router;
