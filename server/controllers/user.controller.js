const { DATA_UPDATED, DATA_RECEIVED, salt } = require("../config/config");
const Model = require("../models/User");
const { getSort, getMatching } = require("../utils/db_utils");

const sortMap = {
    name: ["name"],
    email: ["email"]
};

const searchMap = {
    category: { field: "role" },
    search: { field: "alias" }
};

exports.getAll = async function (req, res, next) {
    const { query } = req;
    const options = {
        page: query.page ? query.page : 1,
        limit: query.limit ? query.limit : 100
    };
    delete query.page;
    delete query.limit;

    const sort = getSort(query, sortMap);
    if (sort) {
        options.sort = sort;
    }

    const match = getMatching(query, searchMap);
    // console.log("users match", match);
    try {
        const aggregate = match ? Model.aggregate(match) : {};
        const data = await Model.aggregatePaginate(aggregate, options);
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
    try {
        const data = await Model.findById(req.user._id || req.params.userId);
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
    const { userId } = req.params;
    const user = { ...req.body };
    try {
        if (user.new_password) {
            delete user.new_password;
            user.password = await bcrypt.hash(user.password, salt);
        }

        const data = await Model.findByIdAndUpdate(userId, user, {
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
