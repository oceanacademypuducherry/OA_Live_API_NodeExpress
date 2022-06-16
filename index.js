const express = require("express");
const cors = require("cors");
// const fileUpload = require("express-fileupload");
const mongoConnect = require("./DatabaseConnection");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const axios = require("axios");
const compilerApi = require("./routes/CompilerApi");
const payment = require("./routes/payment");

const userRouters = require("./routes/UserAction/UserRoute");
const courseRouters = require("./routes/CourseAction/CourseRoute");
const offlineCourseRouters = require("./routes/OfflineCourseAction/OfflineCourseAction");
const trainerRouters = require("./routes/TrainerAction/TrainerRoute");
const purchasedCourseRouters = require("./routes/PurchacedCoursesAction/PurchacedCoursRoute");
// const batchRouters = require("./routes/BatchAction/BatchRouter");
const batchRouters = require("./routes/BatchAction/NewBatchRouter");
const adminRouters = require("./routes/AdminAction/AdminRoute");
const mentorRouters = require("./routes/MentorAction/MentorRoute");
const webinarRouters = require("./routes/Webinar/WebinarRoute");
const scheduleRouters = require("./routes/ScheduleAction/ScheduleRoute");
const zoomAPI = require("./routes/zoom API/meetingAPI");
const downloadedOfflineCourse = require("./routes/DownloadOflineCourse/DownloadOfflineCourseAction");
const subscribedUser = require("./routes/SubscribedUser/SubscribedUserAction");

// MongoDB connection function
mongoConnect();

// env config
dotenv.config();

const app = express();
module.exports = app;
// app.use(fileUpload());
app.use(express.json());
app.use(express.static("files"));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

// all routes
app.get("/", (req, res) => {
  res.send("OA Live API");
});

app.post("/f", (req, res) => {
  res.status(200).send({ message: "File Uploaded", code: 200 });
});

app.post("/jd", compilerApi);

// Routes
app.use("/user", userRouters);
app.use("/course", courseRouters);
app.use("/offlinecourse", offlineCourseRouters);
app.use("/trainer", trainerRouters);
app.use("/purchased", purchasedCourseRouters);
app.use("/batch", batchRouters);
app.use("/admin", adminRouters);
app.use("/mentor", mentorRouters);
app.use("/webinar", webinarRouters);
app.use("/schedule", scheduleRouters);
app.use("/zoom", zoomAPI);
app.use("/downloaded/course", downloadedOfflineCourse);
app.use("/subscribed/user/", subscribedUser);
app.use("/payment", payment);

mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
  app.listen(process.env.PORT || 5000, () =>
    console.log("server running on http://localhost:" + process.env.PORT)
  );
});
