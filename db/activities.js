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
async function attachActivitiesToRoutines(routines) {}

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
      console.log(updateActivity);
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
