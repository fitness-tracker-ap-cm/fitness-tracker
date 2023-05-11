import React, {useState} from "react";
import "./SingleRoutine.css";
import { getAllPublicRoutines, updateRoutine } from "../api";
import UpdateSingleActivityInRoutine from "./UpdateSingleActivityInRoutine";

const ModifyRoutine = (props) => {
// const {selectedRoutine, token ,setAllActivities, allActivities ,isLoggedIn} = props;
const {selectedRoutine, token , setAllPublicRoutines,  setAllActivities, allActivities, isLoggedIn} = props;
console.log("In Modify Routine displaying the selected routine Object : ", selectedRoutine);
const [name, setName] = useState(selectedRoutine.name);
const [goal, setGoal] = useState(selectedRoutine.goal);

const handleSubmit = async (event) => {
  event.preventDefault();
  const myRoutineObj = { name: name, goal: goal, isPublic : selectedRoutine.isPublic};
  const newRoutine = await updateRoutine(
    token,
    myRoutineObj,
    selectedRoutine.id
  );
  if (newRoutine !== null) {
    window.alert("Routine Successfully updated");
    let allRoutines = await getAllPublicRoutines();
    let filteredRoutines = [];
    if (!isLoggedIn) {
      filteredRoutines = allRoutines.filter((routine) => {
        return routine.isPublic === true || routine.isPublic === null;
      });
    } else {
      filteredRoutines = allRoutines.filter((routine) => {
        //console.log("Is the routine public" , routine.isPublic, "Who created it? ", routine.creatorName , "Who is the currentusername ? ",currentUser );
        return (
          routine.isPublic === true ||
          routine.isPublic === null ||
          (routine.isPublic === false &&
            routine.creatorName === selectedRoutine.creatorName)
        );
      });
    }
     // setAllPublicRoutines([newRoutine,...allPublicRoutines.filter((publicRoutine) => publicRoutine.id !== newRoutine.id)]);
    setAllPublicRoutines(filteredRoutines);
  }
 
};

return (
  <>
    <h2>Update Routine</h2>
    <form onSubmit = {handleSubmit} id="add-routine-form">
      <span>
        <label htmlFor=" name">Name</label>
        <input
          type="text"
          id="modify-routine-input-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </span>
      <span>
        <label htmlFor=" goal">Goal</label>
        <input
          type="text"
          id="modify-routine-input-goal"
          name="goal"
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
          required
        /> 
      </span>
      <button type="submit">SAVE ROUTINE</button>
    </form>
    {selectedRoutine.activities.length ? (
            <div>
              {selectedRoutine.activities.map((activity, index) => {
                return (
                  <div key={index}  id='single-routine-container'>
                    <UpdateSingleActivityInRoutine activity={activity} token ={token} setAllActivities={setAllActivities} allActivities={allActivities} />
                  </div>
                );
              })}
            </div>
          ) : (
            <div>
              <h3>No Activities to display</h3>
            </div>
          )}
  </>
);
};
export default ModifyRoutine;
