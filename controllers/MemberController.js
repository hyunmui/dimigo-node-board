class MemberController {
    pageLogin(req, res) {
        res.render('member/login.html.njk');
    }
    doLogin(req, res) {}
    pageRegister(req, res) {
        res.render('member/register.html.njk');
    }
}

module.exports = new MemberController();
