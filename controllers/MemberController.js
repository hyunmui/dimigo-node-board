const memberRepo = require('../models/MemberRepository');

class MemberController {
    pageLogin(req, res) {
        if (req.isLogin()) {
            res.redirect('/');
        }
        res.render('member/login.html.njk');
    }
    tryLogin(req, res) {
        const member = memberRepo.getMember(req.body.email);

        if (member.password === req.body.password) {
            req.session.loginMember = member;
        }

        res.redirect('/');
    }
    logout(req, res) {
        console.log('이거 호출된거 맞니?');
        req.session.destroy((err) => {
            console.log(err);
        });
        res.redirect('/');
    }
    pageRegister(req, res) {
        res.render('member/register.html.njk');
    }
}

module.exports = new MemberController();
