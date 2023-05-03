const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const {
  getAllActivities,
  createActivity,
  getActivityByName,
} = require("../db");
const { ActivityExistsError } = require("../errors");

// GET /api/activities
router.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities).status(200);
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// POST /api/activities

router.post("/", requireUser, async (req, res, next) => {
  const { name, description } = req.body;

  const activityExists = await getActivityByName(name);
  if (activityExists) {
    next({
      message: ActivityExistsError(name),
      name: "Activity already exists",
      error: "Activity already exists",
    });
  } else {
    try {
      const result = await createActivity({ name, description });
      res.send(result);
    } catch (error) {
      next(error);
    }
  }
});

// PATH /api/activities/:activityId
router.post("/", requireUser, async (req, res, next) => {});

// GET /activities/:activityId/routines

module.exports = router;
