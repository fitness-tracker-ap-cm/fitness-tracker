const client = require("./client");

// database functions
async function createActivity({ name, description }) {
  // return the new activity
  try {
    // console.log("Creating activities!");
    const { rows } = await client.query(
      `
    INSERT INTO activities (name, description)
    VALUES($1,$2)
    RETURNING *;
    `,
      [name, description]
    );
    console.log(rows);
    return rows;
  } catch (error) {
    throw new Error();
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
    console.log("activities", rows);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getActivityById(id) {}

async function getActivityByName(name) {}

// used as a helper inside db/routines.js
async function attachActivitiesToRoutines(routines) {}

async function updateActivity({ id, ...fields }) {
  // don't try to update the id
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
