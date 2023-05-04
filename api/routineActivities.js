const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const {
  updateRoutineActivity,
  canEditRoutineActivity,
  getRoutineById,
} = require("../db");
const { UnauthorizedUpdateError } = require("../errors");

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

module.exports = router;
