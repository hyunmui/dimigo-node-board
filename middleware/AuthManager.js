const settingLoginMember = (req, res, next) => {
    if (req.session.loginMember) {
        res.locals.loginMember = req.session.loginMember;
    }

    next();
};

module.exports = settingLoginMember;
