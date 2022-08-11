const Role = require("../models/Role");
const {
    DATA_RECEIVED,
    DATA_UPDATED,
    DATA_CREATED
} = require("../config/config");

exports.getAll = async function (req, res, next) {
    try {
        const data = await Role.find();
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Role.findById(id);
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
    const { id } = req.params;
    try {
        const data = await Role.findByIdAndUpdate(id, dataUpdate, {
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
exports.add = async function (req, res, next) {
    try {
        const data = await Role.create(req.body);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_CREATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
exports.delete = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await Role.findByIdAndDelete(id);
        if (data === null) {
            throw Error(`id: ${id} not found`);
        }
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
