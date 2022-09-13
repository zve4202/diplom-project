const jwt = require("jsonwebtoken");
const { accessSecret, refreshSecret } = require("../config");

const Token = require("../models/Token");

class TokenService {
    generate(payload) {
        const accessToken = jwt.sign(payload, accessSecret, {
            expiresIn: "1h"
        });

        const refreshToken = jwt.sign(payload, refreshSecret);

        return {
            accessToken,
            refreshToken,
            expiresIn: 3600
        };
    }

    async save(user, refreshToken) {
        const data = await Token.findOne({ user });
        if (data) {
            data.refreshToken = refreshToken;
            return await data.save();
        }

        return await Token.create({ user, refreshToken });
    }

    validateRefresh(refreshToken) {
        try {
            return jwt.verify(refreshToken, refreshSecret);
        } catch (e) {
            return null;
        }
    }
    validateAccess(accessToken) {
        try {
            return jwt.verify(accessToken, accessSecret);
        } catch (e) {
            return null;
        }
    }

    async findToken(refreshToken) {
        try {
            return await Token.findOne({ refreshToken });
        } catch (e) {
            return null;
        }
    }
}

module.exports = new TokenService();
