const express = require("express");
const { requireUser } = require("./utils");
const {
  getAllRoutines,
  createRoutine,
  updateRoutine,
  getRoutineById,
  destroyRoutine,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine
} = require("../db");

const router = express.Router();
const { UnauthorizedUpdateError,UnauthorizedDeleteError,DuplicateRoutineActivityError} = require("../errors");
// GET /api/routines
router.get("/", async (req, res, next) => {
  try {
    const allRoutines = await getAllRoutines();
    res.send(allRoutines);
  } catch (error) {
    next(error);
  }
});

// POST /api/routines
router.post("/", requireUser, async (req, res, next) => {
  const { isPublic, name, goal } = req.body;

  try {
    if (req.user) {
      const creatorId = req.user.id;
      const newRoutine = await createRoutine({
        creatorId,
        isPublic,
        name,
        goal,
      });
      res.send(newRoutine);
    }
  } catch (error) {
    next(error);
  }
});
// PATCH /api/routines/:routineId
router.patch("/:routineId", requireUser, async (req, res, next) => {
  const id = +req.params.routineId;

  const { isPublic, goal, name } = req.body;

  try {
    const routine = await getRoutineById(id);
    if (routine.creatorId === req.user.id) {
      const updatedRoutine = await updateRoutine({ id, isPublic, goal, name });
      res.send(updatedRoutine);
    } else {
      res.status(403);
      next({
        error: "403",
        message: UnauthorizedUpdateError(req.user.username, routine.name),
        name: "403",
      });
    }
  } catch (error) {
    console.log("updateroutine error", error);
    next(error);
  }
});

// DELETE /api/routines/:routineId
router.delete("/:routineId", requireUser, async (req, res, next) => {
  const id = +req.params.routineId;
 console.log("router.delete",id);
  try {
    const routine = await getRoutineById(id);
    console.log(routine);
    if (routine) {
      if (routine.creatorId === req.user.id) {
        await destroyRoutine(id);
        res.send(routine);
      } else {
        res.status(403);
        next({
          error: "403",
          message: UnauthorizedDeleteError(req.user.username, routine.name),
          name: "403",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// POST /api/routines/:routineId/activities
router.post("/:routineId/activities", requireUser, async (req, res, next) => {
  const id= +req.params.routineId;
  const routineId = req.params.routineId;

  const { activityId, count, duration } = req.body;
  console.log("Routine ID ACTIVITY ID ETC: ", id,activityId, count, duration);
  try {
    const routineActivities = await getRoutineActivitiesByRoutine({id});
    const activityFound = routineActivities.filter((routineActivity) => routineActivity.activityId === activityId);
    console.log("ACTIVITY FOUND ",activityFound);

    if (!activityFound.length) {
      const newRoutineActivity = await addActivityToRoutine({ routineId,activityId, count, duration });
      console.log("newRoutineActivity : ", newRoutineActivity);
      res.send(newRoutineActivity);
    } else {
      
      next({
        error: "DuplicateRoutineActivityError",
        message: DuplicateRoutineActivityError(req.params.routineId,activityId),
        name: "DuplicateRoutineActivityError",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
