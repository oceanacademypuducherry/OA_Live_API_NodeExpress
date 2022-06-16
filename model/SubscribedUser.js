const mongoose = require("mongoose");

const subscribedUserSchema = mongoose.Schema({
  date: { type: Date, default: Date.now() },
  email: { type: String, require: true },
});

module.exports = mongoose.model("SubscribedUser", subscribedUserSchema);
