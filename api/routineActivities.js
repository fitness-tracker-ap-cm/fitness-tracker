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
  const { name } = await getRoutineById(id);
  const canEdit = await canEditRoutineActivity(id, req.user.id);
  if (!canEdit) {
    next({
      name: "Unauthorized to make edits",
      message: UnauthorizedUpdateError(req.user.username, name),
      error: "Unauthorized to make edits",
    });
  }
  try {
    const result = await updateRoutineActivity({ id, count, duration });
    res.send(result).status(200);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/routine_activities/:routineActivityId

router.delete("/:routineActivityId", requireUser, async (req, res, next) => {
  const id = +req.params.routineActivityId;
  const canEdit = await canEditRoutineActivity(id, req.user.id);
  const { name } = await getRoutineById(id);

  if (!canEdit) {
    res.status(403);
    next({
      name: "Unauthorized to delete",
      message: UnauthorizedDeleteError(req.user.username, name),
      error: "Unauthorized to delete",
    });
  }
  if (canEdit) {
    try {
      const deletedRoutineActivity = await destroyRoutineActivity(id);
      res.send(deletedRoutineActivity).status(200);
    } catch (error) {
      next(error);
    }
  }
  console.log(canEdit);
});

module.exports = router;
