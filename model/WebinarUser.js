const mongoose = require("mongoose");

const webinarUser = new mongoose.Schema({
  username: { type: String, required: true },
  mobileNumber: { type: String, default: "" },
  email: { type: String, default: "" },
  webinar: { type: mongoose.SchemaTypes.ObjectId, ref: "Webinar" },
});

module.exports = mongoose.model("WebinarUser", webinarUser);
