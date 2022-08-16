const { order, statuses } = require("../models/Order");
const orderList = require("../models/OrderList");

const { Types } = require("mongoose");
const {
    DATA_CREATED,
    DATA_UPDATED,
    DATA_DELETED,
    DATA_RECEIVED,
    DATA_NOT_FOUND
} = require("../config/config");

const agg = (match) => [
    {
        $match: match
    },
    {
        $lookup: {
            from: "orderlines",
            localField: "_id",
            foreignField: "orderId",
            as: "docs"
        }
    }
];

exports.get = async function (req, res, next) {
    const { ip } = req;
    const status = statuses[0];
    const match = req.match ? req.match : { userIp: ip, status };
    try {
        const data = await order.aggregate(agg(match));
        if (data.length === 0) {
            req.match = match;
            return next();
        }
        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_RECEIVED
        });
    } catch (e) {
        console.log("basket e", e.message);
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.add = async function (req, res, next) {
    try {
        const data = await order.create(req.match);
        if (data) {
            req.match = { _id: data._id };
            return next();
        }
        console.log("basket data add", data);

        return res.status(404).json({
            status: 404,
            content: null,
            message: DATA_NOT_FOUND
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

const aggList = (id) => [
    {
        $match: {
            orderId: id
        }
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
        $sort: {
            "product.title.artidt.name": 1,
            "product.title.name": 1
        }
    }
];

exports.getItems = async function (req, res, next) {
    const { orderId } = req.params;
    try {
        const data = await orderList.aggregate(aggList(Number(orderId)));
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.updateListItem = async function (req, res, next) {
    try {
        let data;
        if (req.body._id) {
            data = await orderList.findByIdAndUpdate(req.body._id, req.body, {
                new: true
            });
        } else {
            data = await orderList.create(req.body);
        }
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        console.log("basket updateList error", e.message);

        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.delete = async function (req, res, next) {
    const { id: _id } = req.params;
    try {
        const data = await orderList.findByIdAndDelete({ _id });
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.deleteAll = async function (req, res, next) {
    const { orderId } = req.params;
    try {
        const data = await orderList.deleteMany({ orderId });
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
        // const { docs } = req.body;
        // const totals = { totalQty: 0, totalPrice: 0 };
        // docs.forEach((item) => {
        //     const { qty, price } = item;
        //     totals.totalQty += qty;
        //     totals.totalPrice += qty * price;
        // });
        // const data = await order.findByIdAndUpdate(
        //     id,
        //     { ...req.body, ...totals },
        //     { new: true }
        // );
        return res.status(200).json({
            status: 200,
            content: null,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.check = async function (req, res, next) {
    const { id } = req.params;
    try {
        // TODO
        // const { docs } = req.body;
        // const totals = { totalQty: 0, totalPrice: 0 };
        // docs.forEach((item) => {
        //     const { qty, price } = item;
        //     totals.totalQty += qty;
        //     totals.totalPrice += qty * price;
        // });

        // const data = await order.findByIdAndUpdate(
        //     id,
        //     { ...req.body, ...totals },
        //     { new: true }
        // );
        return res.status(200).json({
            status: 200,
            content: null,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
