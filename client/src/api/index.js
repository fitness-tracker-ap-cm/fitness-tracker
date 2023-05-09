const BASE = "http://localhost:3000/api";
//********************aparna **************************
export async function getAllPublicRoutines() {
  try {
    const response = await fetch(`${BASE}/routines`);
    const publicRoutinesList = await response.json();
    console.log("Routines :", publicRoutinesList);
    return publicRoutinesList;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const loginUser = async (userObject) => {
  console.log(userObject);
  try {
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getMe = async (token) => {

    try {
      const response = await fetch(`${BASE}/users/me`, {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (err) {
      console.error(err);
    }
  }

  export const getMyRoutines = async (username, token) => {
    try {
      const response = await fetch(`${BASE}/users/${username}/routines`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await response.json();
      console.log(result);
      return result
    } catch (error) {
      console.error(error);
    }
  };


//*****************************Christian *********************************
export async function getAllActivities() {
  try {
    const response = await fetch(`${BASE}/activities`);
    const activitiesList = await response.json();
    console.log("activities : ", activitiesList);
    return activitiesList;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export const registerUser = async (userObj) => {
  try {
    const response = await fetch(`${BASE}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObj),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.error(err);
  }
};
