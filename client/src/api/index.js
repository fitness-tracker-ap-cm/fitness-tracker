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
  try {
    const response = await fetch(`${BASE}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    });

    const { success, error, data } = await response.json();

    if (success) {
      const { token, message } = data;

      return { token, message };
    }
    if (!success && !error) {
      const { name, message } = data;
      return { name, message };
    }
    console.log(success, error, data);
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
