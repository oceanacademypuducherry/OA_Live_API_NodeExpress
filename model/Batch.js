const mongoose = require("mongoose");
const batchSchema = mongoose.Schema({
  courseId: { type: String, require: true },
  batchName: { type: String, require: true },
  course: { type: mongoose.SchemaTypes.ObjectId, ref: "Course" },
  courseProgress: { type: Number, min: 0, max: 100, default: 0 },
  courseStartDate: { type: Date, default: null },
  duration: { type: Number, default: 90 },
  batchTime: { type: String, require: true },
  trainer: { type: mongoose.SchemaTypes.ObjectId, ref: "Trainer" },
  batchType: { type: String, default: "Week-Days" },
  isComplete: { type: Boolean, default: false },
  isStarted: { type: Boolean, default: false },
  syllabus: { type: Array },
});

module.exports = mongoose.model("Batch", batchSchema);
