const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const {
  updateRoutineActivity,
  canEditRoutineActivity,
  getRoutineById,
  destroyRoutineActivity,
} = require("../db");
const {
  UnauthorizedUpdateError,
  UnauthorizedDeleteError,
} = require("../errors");

// PATCH /api/routine_activities/:routineActivityId
router.patch("/:routineActivityId", requireUser, async (req, res, next) => {
  const id = +req.params.routineActivityId;
  const { count, duration } = req.body;
  try {
    const canEdit = await canEditRoutineActivity(id, req.user.id);
    if (canEdit) {
      const result = await updateRoutineActivity({ id, count, duration });
      res.send(result).status(200);
    } else {
      const routine = await getRoutineById(id);
      if (routine !== null) {
        next({
          message: UnauthorizedUpdateError(req.user.username, routine.name),
          name: "Unauthorized to make edits",
          error: "Unauthorized to make edits",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /api/routine_activities/:routineActivityId

router.delete("/:routineActivityId", requireUser, async (req, res, next) => {
  const id = +req.params.routineActivityId;
  try {
    const canEdit = await canEditRoutineActivity(id, req.user.id);
    if (canEdit) {
      const deletedRoutineActivity = await destroyRoutineActivity(id);
      res.send(deletedRoutineActivity).status(200);
    } else {
      const routine = await getRoutineById(id);
      if (routine !== null) {
        res.status(403);
        next({
          message: UnauthorizedDeleteError(req.user.username, routine.name),
          name: "Unauthorized to delete",
          error: "Unauthorized to delete",
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
