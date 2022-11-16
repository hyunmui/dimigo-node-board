const authManager = {
    middlewareLoginMember(viewEnvironment) {
        this.viewEnvironment = viewEnvironment;
        return settingLoginMember;
    },
};

const settingLoginMember = (req, res, next) => {
    req.isLogin = () => Boolean(req.session?.loginMember);

    if (req.session?.loginMember) {
        authManager.viewEnvironment.addGlobal('loginMember', req.session.loginMember);
    }

    next();
};

module.exports = authManager;
