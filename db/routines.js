const client = require("./client");
const {attachActivitiesToRoutines} = require("./activities");

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
    const { rows: routines } = await client.query(
      `
       SELECT routines.*, users.username AS "creatorName"
       FROM routines
       JOIN users ON routines."creatorId" = users.id
    `
    );

    return await attachActivitiesToRoutines(routines);
  } catch (error) {
    throw error;
  }
}

async function getAllPublicRoutines() {
  try {
    const routines = await getAllRoutines();

    const publicRoutines = routines.filter((routine) => routine.isPublic);

    return publicRoutines;
  } catch (error) {
    throw error;
  }
}

async function getAllRoutinesByUser({ username }) {
  try {
   const routines = await getAllRoutines();
 

   const routinesByUser = routines.filter((routine) => routine.creatorName === username );

    return routinesByUser;
    
    
  } catch (error) {
    throw error;
  }
}

async function getPublicRoutinesByUser({ username }) {
  try {
    const routines = await getAllPublicRoutines();
   
    const publicRoutinesByUser = routines.filter((routine) => routine.creatorName === username);
    
    return publicRoutinesByUser;
  } catch (error) {
    throw error;
  }

}

async function getPublicRoutinesByActivity({ id }) {
  try {
        const routines = await getAllPublicRoutines();
        const routinesByActivity = [];

        routines.map((routine) => {
          if (routine.activities) {
            const activitiesFound = routine.activities.filter(
              (activity) => activity.id === id
            );
            if (activitiesFound.length > 0) {
              routinesByActivity.push(routine);
            }
          }
        });
        return routinesByActivity;
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
