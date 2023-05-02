const client = require("./client");

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {
  try {
    const {
      rows: [newRoutine],
    } = await client.query(
      `
    INSERT INTO routine_activities ("routineId", "activityId", count, duration)
    VALUES($1, $2, $3, $4)
    ON CONFLICT ("routineId", "activityId") DO NOTHING
    RETURNING *;
    `,
      [routineId, activityId, count, duration]
    );
    return newRoutine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivityById(id) {
  try {
    const {
      rows: [routineById],
    } = await client.query(
      `
    SELECT *
    FROM routine_activities
    WHERE id = $1;
    `,
      [id]
    );

    return routineById;
  } catch (error) {
    throw error;
  }
}

async function getRoutineActivitiesByRoutine({ id }) {
  try {
    const { rows } = await client.query(
      `
    SELECT *
    FROM routine_activities
    WHERE "routineId" = $1;
    `,
      [id]
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateRoutineActivity({ id, ...fields }) {
  try {
    const setString = Object.keys(fields)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

    if (setString.length > 0) {
      const {
        rows: [updateRoutine],
      } = await client.query(
        `
      UPDATE routine_activities
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,
        Object.values(fields)
      );
      return updateRoutine;
    }
  } catch (error) {
    throw error;
  }
}

async function destroyRoutineActivity(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    DELETE FROM routine_activities
    WHERE id = $1
    RETURNING *;
    `,
      [id]
    );
    return activity;
  } catch (error) {
    throw error;
  }
}

async function canEditRoutineActivity(routineActivityId, userId) {
  try {
    const {
      rows: [field],
    } = await client.query(
      `SELECT * FROM
        routine_activities
        JOIN routines
        ON routine_activities."routineId" = routines.id
        WHERE routine_activities.id = $1`,
      [routineActivityId]
    );

    return field.creatorId === userId;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};
