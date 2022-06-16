const mongoose = require("mongoose");

const downloadedCourseSchema = mongoose.Schema({
  courseId: { type: String, required: true },
  name: { type: String, require: true },
  mobileNumber: { type: String, require: true },
  email: { type: String, require: true },
});

module.exports = mongoose.model("DownloadedCourseUser", downloadedCourseSchema);
