const { DATA_RECEIVED } = require("../config/config");
const { product_m } = require("../models");
const Category = require("../models/Category");

const agg = [
    {
        $match: {
            count: {
                $gt: 0
            }
        }
    },
    {
        $group: {
            _id: {
                category: "$title.format.category"
            },
            count: {
                $sum: 1
            }
        }
    },
    {
        $lookup: {
            from: "categories",
            localField: "_id.category",
            foreignField: "_id",
            as: "category"
        }
    },
    {
        $unwind: {
            path: "$category"
        }
    },
    {
        $project: {
            _id: "$category._id",
            name: "$category.name",
            sort: "$category.sort",
            count: "$count"
        }
    },
    {
        $sort: {
            sort: 1,
            count: -1
        }
    }
];

exports.getAll = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    const page = req.params.page ? req.params.page : 1;
    const limit = req.params.limit ? req.params.limit : 10;
    try {
        const data = await product_m.aggregate(agg);
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
        const data = await Category.findById(id);
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
        const data = await Category.findByIdAndUpdate(id, req.body, {
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
        const data = await Category.create(req.body);
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
        const data = await Category.findByIdAndDelete(id);
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
