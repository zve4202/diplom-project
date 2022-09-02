const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const DB = {};

DB.mongoose = mongoose;

DB.Sequence = require("./Sequence");
DB.Setting = require("./Setting");

DB.Role = require("./Role");
DB.User = require("./User");
DB.Reminder = require("./Reminder");

DB.Category = require("./Category");
DB.Format = require("./Format");
DB.Label = require("./Label");

DB.Artist = require("./Artist");
DB.Title = require("./Title");
DB.Title_m = require("./TitleMerged");

DB.Product = require("./Product");
DB.Product_m = require("./ProductMerged");

DB.Order = require("./Order").Order;
DB.Order_list = require("./OrderList");

module.exports = DB;
