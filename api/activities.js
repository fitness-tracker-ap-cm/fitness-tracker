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
  const { activityId } = req.params;
  console.log(activityId);

  try {
  } catch (error) {}
});

module.exports = router;

// [
//   {
//     activities: [
//       {
//         count: 83734,
//         description: "30 lbs for 20 reps",
//         duration: 59840,
//         id: 7,
//         name: "Weight Lifting",
//         routineActivityId: 1,
//         routineId: 1,
//       },
//     ],
//     creatorId: 6,
//     creatorName: "Allen",
//     goal: "9a75ee22-d545-47b0-b681-51d6d310734e",
//     id: 1,
//     isPublic: true,
//     name: "c2b739ec-f180-45de-a21e-9b590f45e5ee",
//   },
// ];
