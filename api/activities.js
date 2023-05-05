const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const {
  getAllActivities,
  createActivity,
  getActivityByName,
  getActivityById,
  updateActivity,
  getPublicRoutinesByActivity,
} = require("../db");
const { ActivityExistsError, ActivityNotFoundError } = require("../errors");

// GET /api/activities
router.get("/", async (req, res, next) => {
  try {
    const activities = await getAllActivities();
    res.send(activities).status(200);
  } catch (error) {
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
router.get("/:activityId/routines", async (req, res, next) => {
  const id = +req.params.activityId;

  const activityExists = await getActivityById(id);
  if (!activityExists) {
    next({
      name: "Acvitivity not found",
      message: ActivityNotFoundError(id),
      error: "Acvitivity not found",
    });
  } else {
    try {
      const routines = await getPublicRoutinesByActivity({ id });
      if (routines) {
        res.send(routines);
      }
    } catch (error) {
      next(error);
    }
  }
});

module.exports = router;
