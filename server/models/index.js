const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.sequence = require("./Sequence");
db.setting = require("./Setting");

db.role = require("./Role");
db.user = require("./User");
db.reminder = require("./Reminder");

db.category = require("./Category");
db.format = require("./Format");
db.label = require("./Label");

db.artist = require("./Artist");
db.title = require("./Title");
db.title_m = require("./TitleMerged");

db.product = require("./Product");
db.product_m = require("./ProductMerged");

db.order = require("./Order").order;
db.order_list = require("./OrderList").orderList;

module.exports = db;
