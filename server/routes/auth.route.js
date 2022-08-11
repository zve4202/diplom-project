const express = require("express");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");

const User = require("../models/User");
const { generateUserData } = require("../utils");
const tokenService = require("../services/token.service");

router.post("/signUp", [
    check("email", "Некорректный Email").exists().isEmail(),
    check("password", "Минимальная длина пароля 8 символов").exists().isLength({
        min: 8
    }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array()
                    }
                });
            }
            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_EXISTS",
                        code: 400
                    }
                });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = await User.create({
                ...generateUserData(),
                ...req.body,
                password: hashedPassword
            });

            const tokens = tokenService.generate({
                _id: newUser._id,
                role: newUser.role
            });
            await tokenService.save(newUser._id, tokens.refreshToken);

            res.status(201).send({ ...tokens, content: newUser });
        } catch (e) {
            res.status(500).json({
                message: e.message
            });
        }
    }
]);

router.post("/signIn", [
    check("email", "Некорректный Email").isEmail(),
    check("password", "Пароль не может быть пустым").exists(),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_DATA",
                        code: 400,
                        errors: errors.array()
                    }
                });
            }

            const { email, password } = req.body;
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                return res.status(400).json({
                    error: {
                        message: "EMAIL_NOT_FOUND",
                        code: 400
                    }
                });
            }

            const isPasswordEqual = await bcrypt.compare(
                password,
                existingUser.password
            );

            if (!isPasswordEqual) {
                return res.status(400).json({
                    error: {
                        message: "INVALID_PASSWORD",
                        code: 400
                    }
                });
            }

            const tokens = tokenService.generate({
                _id: existingUser._id,
                role: existingUser.role
            });
            await tokenService.save(existingUser._id, tokens.refreshToken);

            res.status(200).send({ ...tokens, content: existingUser });
        } catch (e) {
            // console.log(e);
            res.status(500).json({
                message: e.message
            });
        }
    }
]);

function isTokenInvalid(data, dbToken) {
    return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const data = tokenService.validateRefresh(refreshToken);
        const dbToken = await tokenService.findToken(refreshToken);

        if (isTokenInvalid(data, dbToken)) {
            return res.status(401).json({
                message: "Unathorized"
            });
        }

        const user = await User.findById(data._id);
        const tokens = tokenService.generate({
            _id: user._id,
            role: user.role
        });
        await tokenService.save(data._id, tokens.refreshToken);

        res.status(200).send({ ...tokens });
    } catch (e) {
        res.status(500).json({
            message: e.message
        });
    }
});

router.get("/", async (req, res) => {
    res.end("OK!");
});

module.exports = router;
