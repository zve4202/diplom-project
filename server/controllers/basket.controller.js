const Model = require("../models/Basket");
const { Types } = require("mongoose");
const {
    DATA_CREATED,
    DATA_UPDATED,
    DATA_DELETED,
    DATA_RECEIVED
} = require("../config/config");

const agg = (id) => [
    {
        $match: {
            _id: new Types.ObjectId(id)
        }
    },
    {
        $lookup: {
            from: "v_products",
            localField: "docs.id",
            foreignField: "_id",
            as: "products"
        }
    }
];

exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const match = agg(id);
        const data = await Model.aggregate(match);
        console.log("data", data);
        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.update = async function (req, res, next) {
    const { id } = req.params;
    try {
        const { docs } = req.body;
        const totals = { totalQty: 0, totalPrice: 0 };
        docs.forEach((item) => {
            const { qty, price } = item;
            totals.totalQty += qty;
            totals.totalPrice += qty * price;
        });
        const data = await Model.findByIdAndUpdate(
            id,
            { ...req.body, ...totals },
            { new: true }
        );

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
        const data = await Model.create(req.body);
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
        const data = await Model.findByIdAndDelete(id);
        if (data === null) {
            throw Error(`${Model.name} id: ${id} not found`);
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

exports.apply = async function (req, res, next) {
    const { id } = req.params;
    try {
        // TODO
        const { docs } = req.body;
        const totals = { totalQty: 0, totalPrice: 0 };
        docs.forEach((item) => {
            const { qty, price } = item;
            totals.totalQty += qty;
            totals.totalPrice += qty * price;
        });
        const data = await Model.findByIdAndUpdate(
            id,
            { ...req.body, ...totals },
            { new: true }
        );
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
