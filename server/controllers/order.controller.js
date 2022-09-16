const { ObjectId } = require("mongoose").Types;
const { Order } = require("../models/Order");
const OrderList = require("../models/OrderList");

const { DATA_RECEIVED, DATA_UPDATED } = require("../config");

const agg = (match) => [
    {
        $match: match
    },
    {
        $sort: {
            _id: -1
        }
    }
];

exports.getAll = async function (req, res, next) {
    const { type, userId } = req.params;
    if (userId !== req.user._id) {
        if (req.user.role !== "admin") {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" });
        }
    }
    const statusArray =
        type === "current"
            ? ["new", "assembled", "pendingPayment", "sent"]
            : ["delivered", "cancelled"];

    const match = {
        userId: ObjectId(userId),
        status: { $in: statusArray }
    };

    try {
        const data = await Order.aggregate(agg(match));

        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

const aggList = (match) => [
    {
        $lookup: {
            from: "orders",
            localField: "orderId",
            foreignField: "_id",
            as: "order"
        }
    },
    {
        $unwind: {
            path: "$order"
        }
    },
    {
        $match: match
    },
    {
        $lookup: {
            from: "v_products",
            localField: "product",
            foreignField: "_id",
            as: "product"
        }
    },
    {
        $unwind: {
            path: "$product"
        }
    },
    {
        $project: {
            _id: 1,
            orderId: 1,
            product: 1,
            status: 1,
            qty: 1,
            price: 1
        }
    },
    {
        $sort: {
            "product.title.artidt.name": 1,
            "product.title.name": 1
        }
    }
];

exports.getItems = async function (req, res, next) {
    const { type, userId } = req.params;
    if (userId !== req.user._id) {
        if (req.user.role !== "admin") {
            return res
                .status(401)
                .json({ status: 401, message: "Unauthorized" });
        }
    }

    const statusArray =
        type === "current"
            ? ["new", "assembled", "pendingPayment", "sent"]
            : ["delivered", "cancelled"];

    const match = {
        "order.userId": ObjectId(userId),
        "order.status": { $in: statusArray }
    };

    try {
        const data = await OrderList.aggregate(aggList(match));

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
        const data = await Order.findByIdAndUpdate(id, req.body, {
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
        const data = await Order.create({
            ...req.body,
            _id: createId(order.name)
        });

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
        const data = await Order.findByIdAndDelete(id);
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
