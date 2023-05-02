const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    // console.log("Creating activities!");
    const {
      rows: [activity],
    } = await client.query(
      `
    INSERT INTO activities (name, description)
    VALUES($1,$2)
    RETURNING *;
    `,
      [name, description]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

async function getAllActivities() {
  // select and return an array of all activities
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM activities;
     `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT * 
    FROM activities
    WHERE id = $1
    `,
      [id]
    );

    return activity;
  } catch (error) {
    throw error;
  }
}

async function getActivityByName(name) {
  try {
    const {
      rows: [activity],
    } = await client.query(
      `
    SELECT * 
    FROM activities
    WHERE name = $1
    `,
      [name]
    );

    return activity;
  } catch (error) {}
}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {
  const routinesToReturn = [...routines]; // prevents unwanted side effects.
  // $1, $2, $3
  const position = routines.map((_, index) => `$${index + 1}`).join(", ");
  const routineIds = routines.map((routine) => routine.id);

  // get the activities, JOIN with routine_activities (so we can get a routineId)
  const { rows: activities } = await client.query(
    `
  SELECT activities.*, routine_activities.duration, routine_activities.count, routine_activities."routineId", routine_activities.id AS "routineActivityId"
  FROM activities
  JOIN routine_activities ON routine_activities."activityId" = activities.id
  WHERE routine_activities."routineId" IN (${position})
  `,
    routineIds
  );

  // console.log('these are my activities: ----->', activities);

  // loop over each routine
  for (const routine of routinesToReturn) {
    // if the routine.id matches the activtiy.routineId then add to routine.
    const activitiesToAdd = activities.filter(
      (activity) => activity.routineId === routine.id
    );

    routine.activities = activitiesToAdd;
  }

  console.log("these are my routines: ----->", routines[3]);
  // console.log('these are my routines: ----->', routines[3].activities);
  return routinesToReturn;
}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id

  try {
    const setString = Object.keys(fields)
      .map((key, index) => `${key}=$${index + 1}`)
      .join(", ");

    if (setString.length > 0) {
      const {
        rows: [updateActivity],
      } = await client.query(
        `
      UPDATE activities
      SET ${setString}
      WHERE id = ${id}
      RETURNING *;
      `,
        Object.values(fields)
      );
      return updateActivity;
    }
  } catch (error) {
    throw error;
  }
  // do update the name and description
  // return the updated activity
}

module.exports = {
  getAllActivities,
  getActivityById,
  getActivityByName,
  attachActivitiesToRoutines,
  createActivity,
  updateActivity,
};
