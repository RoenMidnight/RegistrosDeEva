const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.user = require("./user.model");
db.role = require("./role.model");
db.Roles = ["membro", "admin", "coruja"];
module.exports = db;