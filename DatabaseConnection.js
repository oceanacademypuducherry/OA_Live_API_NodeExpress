const mongoose = require("mongoose");
require("dotenv").config();

const mongoConnect = () => {
  mongoose.connect(process.env.OFLINE_DATABASE_CONNECTION);
  // mongoose.connect("mongodb+srv://root:root@oa.qvvjb.mongodb.net/OA_Live_API");

  // mongoose.connect(
  //   "mongodb+srv://root:root@oceanacademy.atrtb.mongodb.net/OA_Live_API"
  // );
};

module.exports = mongoConnect;
