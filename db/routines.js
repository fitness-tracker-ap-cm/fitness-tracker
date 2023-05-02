const client = require("./client");

async function createRoutine({ creatorId, isPublic, name, goal }) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
    INSERT INTO routines("creatorId", "isPublic",name,goal)
    VALUES ($1,$2,$3,$4)
    RETURNING *;
  `,
      [creatorId, isPublic, name, goal]
    );

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutineById(id) {
  try {
    const {
      rows: [routine],
    } = await client.query(
      `
        SELECT * 
        FROM routines
        WHERE id = $1;
        `,
      [id]
    );

    if (!routine) {
      throw error;
    }

    const { rows: activities } = await client.query(
      `
      SELECT activities.*
      FROM activities
      JOIN routine_activities
      ON activities.id = routine_activities."activityId"
      WHERE routine_activities."routineId" = $1;
    `,
      [routine.id]
    );


    // const { rows: activities } = await client.query(
    //   `
    //   SELECT activities.*, routine_activities.duration,routine_activities.count, routine_activities."routineId", routine_activities.id as "routineActivityId"
    //   FROM activities
    //   JOIN routine_activities
    //   ON activities.id = routine_activities."activityId"
    //   WHERE routine_activities."routineId" = $1;
    // `,[routine.id]);

 

    const {
      rows: [user],
    } = await client.query(
      `
        SELECT id,username
        FROM users
       WHERE users.id = $1;
      `,
      [routine.creatorId]
    );

    routine.activities = activities;
    routine.creatorName = user.username;

    return routine;
  } catch (error) {
    throw error;
  }
}

async function getRoutinesWithoutActivities() {
  try {
    const { rows } = await client.query(
      `SELECT *
       FROM routines;
     `
    );
    console.log("routines", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutines() {
  try {
    const { rows: routineIds } = await client.query(`
        SELECT id
        FROM routines;
    `);

    const routines = await Promise.all(
      routineIds.map((routine) => getRoutineById(routine.id))
    );
 console.log("ALL THE ROUTINES: ",routines[0]);
    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const { rows: routineIds } = await client.query(`
      SELECT id
      FROM routines
      WHERE "isPublic"= TRUE;
    `);

    const routines = await Promise.all(
      routineIds.map((routine) => getRoutineById(routine.id))
    );

    return routines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
    const { rows: routineIds } = await client.query(`
    SELECT routines.id
    FROM routines
    JOIN users 
    ON routines."creatorId" = users.id
    WHERE users.username = $1;
    `,[username]);

    const routines = await Promise.all(
      routineIds.map((routine) => getRoutineById(routine.id))
    );

    return routines;
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const { rows: routineIds } = await client.query(`
    SELECT routines.id
    FROM routines
    JOIN users 
    ON routines."creatorId" = users.id
    WHERE routines."isPublic" = TRUE AND users.username = $1;
    `,[username]);

    const routines = await Promise.all(
      routineIds.map((routine) => getRoutineById(routine.id))
    );

    return routines;
  } catch (error) {
    throw error;
  }

}

async function getPublicRoutinesByActivity({ id }) {

  try {
    const { rows: routineIds } = await client.query(`
    SELECT routines.id
    FROM routines
    JOIN routine_activities
    ON routine_activities."routineId" = routines.id
    WHERE routines."isPublic" = true 
    AND routine_activities."activityId" = $1;
    `,[id]);

    const routines = await Promise.all(
      routineIds.map((routine) => getRoutineById(routine.id))
    );

    return routines;
  } catch (error) {
    throw error;
  }
  
}

async function updateRoutine({ id, ...fields }) {
  const setString = Object.keys(fields).map(
    (key, index) => `"${ key }"=$${ index + 1 }`
  ).join(', ');

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const { rows: [ routine ] } = await client.query(`
      UPDATE routines
      SET ${ setString }
      WHERE id=${ id }
      RETURNING *;
    `, Object.values(fields));

    return routine;
  } catch (error) {
    throw error;
  }

}

async function destroyRoutine(id) {
  try{

    await client.query(
      `
      DELETE FROM routine_activities
      WHERE "routineId" = $1;
      `,[id]);

    await client.query(
      `
      DELETE FROM routines
      WHERE id = $1;
      `,[id]);
  }
  catch(error)
  {
    console.log(error);
  }
}

module.exports = {
  getRoutineById,
  getRoutinesWithoutActivities,
  getAllRoutines,
  getAllPublicRoutines,
  getAllRoutinesByUser,
  getPublicRoutinesByUser,
  getPublicRoutinesByActivity,
  createRoutine,
  updateRoutine,
  destroyRoutine,
};
