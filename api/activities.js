const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const {
  getAllActivities,
  createActivity,
  getActivityByName,
  getActivityById,
  updateActivity,
} = require("../db");
const { ActivityExistsError, ActivityNotFoundError } = require("../errors");

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
router.patch("/:activityId", requireUser, async (req, res, next) => {
  const id = +req.params.activityId;
  const { name, description } = req.body;

  try {
    const activity = await getActivityById(id);
    console.log(activity);

    if (!activity) {
      next({
        message: ActivityNotFoundError(id),
        name: "Activity not found",
        error: "Activity not found",
      });
    } else {
      const activityNameExists = await getActivityByName(name);
      if (activityNameExists) {
        next({
          message: ActivityExistsError(name),
          name: "Activity name already exists",
          error: "Activity name already exists",
        });
      } else {
        const result = await updateActivity({ id, name, description });
        res.send(result);
      }
    }
  } catch (error) {
    next(error);
  }
});

// GET /activities/:activityId/routines

module.exports = router;
