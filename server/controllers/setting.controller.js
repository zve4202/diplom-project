const Setting = require("../models/Setting");
const { DATA_RECEIVED, DATA_UPDATED, DATA_CREATED } = require("../config");

exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Setting.findById(1);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
exports.update = async function (req, res, next) {
    try {
        const data = await Setting.findByIdAndUpdate(1, dataUpdate, {
            new: true
        });
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
