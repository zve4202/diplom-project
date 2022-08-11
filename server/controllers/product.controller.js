const { getSort, getMatching, createId } = require("../utils/db_utils");
const { product_m, product } = require("../models");

const {
    DATA_CREATED,
    DATA_UPDATED,
    DATA_RECEIVED,
    DATA_DELETED
} = require("../config/config");

const searchMap = {
    category: { field: "title.format.category", number: true },
    search: { field: ["title.artist.alias", "title.alias"] },
    artist: { field: "title.artist._id", number: true },
    format: { field: "title.format._id", number: true },
    label: { field: "title.label._id", number: true },
    origin: { field: "title.origin" },
    style: { field: "title.style" },
    inStock: { field: "count", action: { $gt: 0 } },
    image: { field: "title.image", action: { $ne: null } }
};

const sortMap = {
    name: ["title.artist.name", "title.name"],
    format: ["title.format.name"],
    label: ["title.label.name"],
    origin: ["title.origin"],
    style: ["title.style"],
    price: ["price"]
};

exports.getAll = async function (req, res, next) {
    try {
        console.log("req.params, req.query", req.params, req.query);
        const { query } = req;
        const options = {
            page: query.page || 1,
            limit: query.limit || 100
        };
        delete query.page;
        delete query.limit;
        const sort = getSort(query, sortMap);
        if (sort) {
            delete query.sort;
            delete query.order;
            options.sort = sort;
        }

        let match = getMatching(query, searchMap);
        if (query.inStock) {
        }
        console.log("query, match", query, match);

        const aggregate = match
            ? product_m.aggregate(match, { allowDiskUse: true })
            : {};
        const data = await product_m.aggregatePaginate(aggregate, options);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        console.log("Product error:", e);
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.get = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await product_m.findById(id);
        return res.status(200).json({
            status: 200,
            content: data,
            message: DATA_RECEIVED
        });
    } catch (e) {
        return res.status(500).json({ status: 500, message: e.message });
    }
};

exports.getBarcode = async function (req, res, next) {
    const { id } = req.params;
    try {
        const data = await product_m.find({ "title.barcode": id });
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
        const data = await product.findByIdAndUpdate(id, req.body, {
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
        const data = await product_m.findById((await product.create(body))._id);
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
        const data = await product.findByIdAndDelete(id);
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
