const client = require("./client");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const {
      rows: [user],
    } = await client.query(
      `

    INSERT INTO users(username, password)
    VALUES ($1,$2)
    ON CONFLICT (username) DO NOTHING
    RETURNING *;

  `,
      [username, hashedPassword]
    );
    //removing the password so it is not returned
    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const user = await getUserByUsername(username);
    const hashedPassword = user.password;

    const passwordsMatch = await bcrypt.compare(password, hashedPassword);


      if (passwordsMatch) {
        delete user.password;
        return user;
      }

  }
   catch (error) {

    console.log(error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE id=$1;
  `,
      [userId]
    );
    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByUsername(userName) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
    SELECT *
    FROM users
    WHERE username=$1;
  `,
      [userName]
    );

    return user;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
};
