const { ObjectId } = require("mongoose").Types;
const {
    DATA_RECEIVED,
    DATA_UPDATED,
    DATA_CREATED,
    DATA_DELETED
} = require("../config");
const Reminder = require("../models/Reminder");

exports.getAll = async function (req, res, next) {
    try {
        // console.log("getAll", req.user);
        const data = await Reminder.find({ userId: ObjectId(req.user._id) });
        // console.log("getAll data", data);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        res.status(500).send({ status: 500, message: e.message });
    }
};

exports.get = async function (req, res, next) {
    const { titleId } = req.params;
    try {
        const data = await Reminder.findOne({
            userId: ObjectId(req.user._id),
            titleId: Number(titleId)
        });
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        res.status(500).send({ status: 500, message: e.message });
    }
};

exports.create = async function (req, res, next) {
    try {
        const data = await Reminder.create({
            ...req.body,
            userId: ObjectId(req.user._id)
        });

        // console.log(data);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_CREATED
        });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ status: 500, message: e.message });
    }
};

exports.update = async function (req, res, next) {
    const { titleId } = req.params;
    try {
        const data = await Reminder.findOneAndUpdate(
            {
                userId: ObjectId(req.user._id),
                titleId: Number(titleId)
            },
            {
                ...req.body,
                userId: ObjectId(req.user._id),
                titleId: Number(titleId)
            },
            {
                new: true,
                upsert: true
            }
        );
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        res.status(500).send({ status: 500, message: e.message });
    }
};

exports.delete = async function (req, res, next) {
    const { titleId } = req.params;
    try {
        const data = await Reminder.findOneAndDelete({
            userId: ObjectId(req.user._id),
            titleId: Number(titleId)
        });
        if (data === null) {
            throw Error(`id: ${titleId} not found`);
        }

        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        res.status(500).send({ status: 500, message: e.message });
    }
};

exports.deleteAll = async function (req, res, next) {
    try {
        const data = await Reminder.deleteMany({
            userId: ObjectId(req.user._id)
        });

        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        res.status(500).send({ status: 500, message: e.message });
    }
};
