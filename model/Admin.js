const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  mobileNumber: { type: String, require: true },
  adminName: { type: String, require: true },
  email: { type: String, require: true },
  adminImage: { type: String, require: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
