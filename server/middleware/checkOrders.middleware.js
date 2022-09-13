const { Order, statuses } = require("../models/Order");
const OrderList = require("../models/OrderList");
const Product = require("../models/Product");

async function disassemble(doc) {
    const docs = await OrderList.find({ orderId: doc._id });

    docs.forEach(async (item) => {
        const product = await Product.findOneAndUpdate(
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

        await OrderList.findByIdAndUpdate(item._id, item);
    });

    await Order.findByIdAndUpdate(doc._id, {
        ...doc,
        status: statuses[0],
        checkedAt: null
    });
}

module.exports = async (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const orders = await Order.find({
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
