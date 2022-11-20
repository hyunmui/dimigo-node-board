const memberRepo = require('../models/MemberRepository');

class MemberController {
    pageLogin(req, res) {
        if (req.session.loginMember) {
            res.redirect('/');
        }
        res.render('member/login.html.njk', { csrfToken: req.csrfToken() });
    }
    tryLogin(req, res) {
        const member = memberRepo.getMember(req.body.email);

        if (member.password === req.body.password) {
            req.session.regenerate(() => {
                req.session.loginMember = member;
                req.session.save(() => res.redirect('/'));
            });
        } else {
            res.render('member/login.html.njk');
        }
    }
    logout(req, res, next) {
        req.session.loginMember = null;
        req.session.save(function (err) {
            if (err) next(err);

            // regenerate the session, which is good practice to help
            // guard against forms of session fixation
            req.session.regenerate(function (err) {
                if (err) next(err);
                res.redirect('/');
            });
        });
    }
    pageRegister(req, res) {
        res.render('member/register.html.njk');
    }
}

module.exports = new MemberController();
