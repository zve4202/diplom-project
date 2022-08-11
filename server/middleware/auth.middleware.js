const tokenService = require("../services/token.service");

module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }

    try {
        const auth = req.headers.authorization;
        if (!auth) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        const token = auth.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        const data = tokenService.validateAccess(token);
        // console.log(data);
        if (!data) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        req.user = data;
        next();
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};
