const tokenService = require("../services/token.service");

function isNotAdmin(req) {
    return (
        !req.user ||
        !(req.user.role === "admin" || req.user._id === req.params.userId)
    );
}
module.exports = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        if (isNotAdmin(req)) {
            return res.status(401).json({
                message: "Unauthorized"
            });
        }
        next();
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};
