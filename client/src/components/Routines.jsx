import React from "react";
import SingleRoutine from "./SingleRoutine";

const Routines = (props) => {
const {allPublicRoutines, isLoggedIn , currentUser} = props;

const filteredRoutines = () =>{

  if(!isLoggedIn)
  {
    const publicRoutinesOnly= allPublicRoutines.filter((routine) => {
     return (routine.isPublic === true || routine.isPublic === null)
    });
    return publicRoutinesOnly;
  }
  else{
    const publicAndPrivateRoutinesByCurrUser = allPublicRoutines.filter((routine) => {
      //console.log("Is the routine public" , routine.isPublic, "Who created it? ", routine.creatorName , "Who is the currentusername ? ",currentUser );
      return (routine.isPublic === true || routine.isPublic === null || (routine.isPublic === false && routine.creatorName === currentUser))
    });
    return publicAndPrivateRoutinesByCurrUser;
  }
}

  return (
    <>
      <h1>Routines</h1>
      {filteredRoutines().length ? (
        <div>
          {filteredRoutines().map((routine, index) => {
            return (
              <div key={index}>
                <SingleRoutine Routine routine={routine} />
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <h3>No Routines to display</h3>
        </div>
      )}
    </>
  );
};

export default Routines;
