const express = require("express");
const mongoose = require("mongoose");
const WebinarMentor = require("../../model/WebinarMentor");
const Webinar = require("../../model/Webinar");
const WebinarUser = require("../../model/WebinarUser");
const Admin = require("../../model/Admin");
const verifyToken = require("../../verifyToken");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allWebinars = await Webinar.find().populate("mentor");

    res.status(200).json(allWebinars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all webinar mentor
router.post("/mentor/all", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const allMentor = await WebinarMentor.find();
    res.status(200).json(allMentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add webinar mentor
router.post("/mentor/add", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const webinarMentor = await WebinarMentor(req.body);
    await webinarMentor.save();
    res.status(201).json(webinarMentor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// add webinar
router.post("/add", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const webinar = await Webinar(req.body);
    await webinar.save();
    res.status(201).json(webinar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//delete Wbinar
router.post("/delete", verifyToken, adminMiddleware, async (req, res) => {
  try {
    await Webinar.deleteOne({ _id: req.body.webinarId });

    res.status(201).json("webinar deleted");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all upcoming webinar
router.post("/upcoming", async (req, res) => {
  let currentDate = new Date().toISOString();

  try {
    const upcomingWebinars = await Webinar.find({
      isComplete: false,
      startAt: { $gt: currentDate },
    })
      .sort({
        startAt: 1,
      })
      .populate("mentor");

    res.status(200).json(upcomingWebinars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all completed webinar
router.post("/completed", verifyToken, adminMiddleware, async (req, res) => {
  try {
    const completedWebinar = await Webinar.find({ isComplete: true });

    res.status(200).json(completedWebinar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get  upcoming webinar with webinar id
router.get("/upcoming/:webinarId", async (req, res) => {
  try {
    const oneWebinar = await Webinar.findById(req.params.webinarId).populate(
      "mentor"
    );

    res.status(200).json(oneWebinar);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get  upcoming webinar notification
router.get("/notification", async (req, res) => {
  let currentDate = new Date().toISOString();
  console.log(currentDate);
  try {
    const notification = await Webinar.findOne()
      .where("startAt")
      .gt(currentDate)
      .sort({ startAt: 1 });

    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//register webinar for  user
router.post("/user/add", async (req, res) => {
  const webinarId = req.body.webinar;

  let webinar = await Webinar.findById(webinarId);
  let endrollCount = webinar.enrolledCount;
  webinar.enrolledCount = endrollCount + 1;
  await webinar.save();
  try {
    const webinarUser = await WebinarUser(req.body);
    await webinarUser.save();
    res.status(201).json(webinarUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get webinar users with webinar id
router.get("/users/:webinarId", async (req, res) => {
  try {
    const tihsWebinarUser = await WebinarUser.find({
      webinar: req.params.webinarId,
    });

    res.status(200).json(tihsWebinarUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/completed/:webinarId", async (req, res) => {
  try {
    const tihsWebinarUser = await Webinar.updateOne(
      {
        _id: req.params.webinarId,
      },
      { $set: { isComplete: req.body.isComplete } }
    );

    res.status(200).json(tihsWebinarUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function adminMiddleware(req, res, next) {
  let admin;
  try {
    admin = await Admin.findById(req.user["_id"]);

    if (admin == null)
      return res.status(400).json({ message: "admin not found" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
  res.admin = admin;
  next();
}

module.exports = router;
