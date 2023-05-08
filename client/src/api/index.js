const BASE = 'http://localhost:3000/api';
//********************aparna **************************
export async function getAllPublicRoutines() {

    try{
        const response = await fetch(`${BASE}/routines`);
        const publicRoutinesList = await response.json();
        console.log("Routines :",publicRoutinesList);
        return publicRoutinesList;
    }
    catch(error)
    {
        console.error(error);
        throw error;
    }

}

//*****************************Christian *********************************

export async function getAllActivities() {

    try{
        const response = await fetch(`${BASE}/activities`);
        const activitiesList = await response.json();
        console.log("activities : ",activitiesList);
        return activitiesList;
    }
    catch(error)
    {
        console.error(error);
        throw error;
    }

}