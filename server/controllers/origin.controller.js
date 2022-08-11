const { title } = require("../models");
const { DATA_RECEIVED } = require("../config/config");

exports.getAll = async function (req, res, next) {
    try {
        const data = await (
            await title.distinct("origin")
        )
            .filter((item) => item && item > "")
            .sort((a, b) => {
                if (a < b) {
                    return -1;
                }
                if (a > b) {
                    return 1;
                }
            });

        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
