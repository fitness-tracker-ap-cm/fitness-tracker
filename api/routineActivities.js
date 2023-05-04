const express = require("express");
const router = express.Router();
const { requireUser } = require("./utils");
const {
  updateRoutineActivity,
  getRoutineActivitiesByRoutine,
  canEditRoutineActivity,
  getRoutineActivityById,
} = require("../db");

// PATCH /api/routine_activities/:routineActivityId
router.patch("/:routineActivityId", requireUser, async (req, res, next) => {
  const id = +req.params.routineActivityId;
  const routine_activity = await getRoutineActivityById(id);
  console.log(routine_activity);
});

// DELETE /api/routine_activities/:routineActivityId

module.exports = router;
