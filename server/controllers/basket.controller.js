const { Order, statuses } = require("../models/Order");
const OrderList = require("../models/OrderList");
const Product = require("../models/Product");

const {
    DATA_CREATED,
    DATA_UPDATED,
    DATA_DELETED,
    DATA_RECEIVED,
    DATA_NOT_FOUND
} = require("../config");

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
    const statusArray = [statuses[0], statuses[1], statuses[2]];
    const match = req.match
        ? req.match
        : { userIp: ip, status: { $in: statusArray } };
    try {
        const data = await Order.aggregate(agg(match));
        if (data.length === 0) {
            return next();
        }
        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.add = async function (req, res, next) {
    try {
        const { ip } = req;

        const newdata = new Order({ userIp: ip, status: statuses[0] });
        const data = await newdata.save();
        if (data) {
            req.match = { _id: data._id };
            return next();
        }

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
        const data = await OrderList.aggregate(aggList(Number(orderId)));
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
    const order = await Order.findOne({
        _id: req.body.orderId,
        status: statuses[0]
    });

    if (!order) {
        return res.status(409).json({
            status: 409,
            message: "???????????????? ???????????? ?????? ???????????????????? ?? ???????? ??????????????"
        });
    }

    try {
        let data;
        if (req.body._id) {
            data = await OrderList.findByIdAndUpdate(req.body._id, req.body, {
                new: true
            });
        } else {
            data = new OrderList(req.body);
            data = await data.save();
        }
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.delete = async function (req, res, next) {
    const { id: _id } = req.params;
    try {
        const data = await OrderList.findByIdAndDelete(
            { _id },
            {
                new: true
            }
        );
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
        const data = await OrderList.deleteMany(
            { orderId },
            {
                new: true
            }
        );
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_DELETED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.check = async function (req, res, next) {
    try {
        const { _id, docs } = req.body;
        docs.forEach(async (item, index) => {
            const needQty = item.qty;
            const product = await Product.findOneAndUpdate(
                { _id: item.product },
                { $inc: { count: -item.qty } },
                {
                    new: true
                }
            );
            if (product.count < 0) {
                const qty = product.count + item.qty;
                item.qty = Math.max(0, qty);
                await Product.findOneAndUpdate(
                    { _id: item.product },
                    { $inc: { count: -qty } },
                    {
                        new: true
                    }
                );
            }

            if (item.qty !== needQty) {
                item.needQty = needQty;
                if (item.qty === 0) {
                    item.status = statuses[statuses.length - 1];
                } else item.status = statuses[statuses.length - 2];
            } else item.status = statuses[1];

            await OrderList.findByIdAndUpdate(item._id, item, {
                new: true
            });
        });

        await Order.findByIdAndUpdate(_id, {
            ...req.body,
            status: statuses[1],
            checkedAt: new Date()
        });
        const data = await Order.aggregate(agg({ _id }));

        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.disassemble = async function (req, res, next) {
    try {
        const { _id, docs } = req.body;
        docs.forEach(async (item, index) => {
            const product = await Product.findOneAndUpdate(
                { _id: item.product },
                { $inc: { count: item.qty } },
                {
                    new: true
                }
            );

            if (item.needQty) {
                item.qty = item.needQty;
            }
            item.status = statuses[0];

            await OrderList.findByIdAndUpdate(item._id, item, {
                new: true
            });
        });

        await Order.findByIdAndUpdate(_id, {
            ...req.body,
            status: statuses[0],
            checkedAt: null
        });

        const data = await Order.aggregate(agg({ _id }));

        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.apply = async function (req, res, next) {
    try {
        const { _id, deliveryInfo } = req.body;
        const { payment } = deliveryInfo;
        const status = payment === "Acquiring" ? statuses[2] : statuses[3];

        await Order.findByIdAndUpdate(_id, {
            ...req.body,
            status
        });

        const data = await Order.aggregate(agg({ _id }));

        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.setPay = async function (req, res, next) {
    try {
        const { _id, sumOfPay } = req.body;
        const status = statuses[3];

        await Order.findByIdAndUpdate(_id, {
            ...req.body,
            sumOfPay,
            status
        });

        const data = await Order.aggregate(agg({ _id }));

        return res.status(200).json({
            status: 200,
            content: data[0],
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.info = async function (req, res, next) {
    try {
        const { _id, deliveryInfo } = req.body;

        await Order.findByIdAndUpdate(_id, {
            deliveryInfo
        });

        return res.status(200).json({
            status: 200,
            content: deliveryInfo,
            message: DATA_UPDATED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};
