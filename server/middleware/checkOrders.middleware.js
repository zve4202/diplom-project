const { order } = require("../models/Order");
const orderList = require("../models/OrderList");
const product = require("../models/Product");

async function disassemble(doc) {
    const docs = await orderList.find({ orderId: doc._id });

    docs.forEach(async (item) => {
        const product = await product.findOneAndUpdate(
            { _id: item.product },
            { $inc: { count: item.qty } },
            {
                new: true
            }
        );

        if (item.needQty) {
            item.qty = item.needQty;
            item.status = statuses[0];
        }

        await orderList.findByIdAndUpdate(item._id, item);
    });

    await order.findByIdAndUpdate(_id, {
        ...req.body,
        status: statuses[0],
        checkedAt: null
    });
}

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const orders = await order.find({
            status: {
                $in: ["checked", "needpay"]
            }
        });
        orders.forEach((item) => {
            const deadline = new Date(item.checkedAt).setDate(
                new Date(item.checkedAt).getDate() + 3
            );
            const diff = deadline - new Date();
            if (diff <= 0) {
                disassemble(item);
            }
        });

        next();
    } catch (e) {
        return res.status(500).json({
            message: e.message
        });
    }
};
