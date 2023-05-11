import React, {useState} from "react";
import "./SingleRoutine.css";
import { updateRoutine } from "../api";
import UpdateSingleActivityInRoutine from "./UpdateSingleActivityInRoutine";



const ModifyRoutine = (props) => {
  const {selectedRoutine, token} = props;
console.log("In Modify Routine displaying the selected routine Object : ", selectedRoutine);
const [name, setName] = useState(selectedRoutine.name);
const [goal, setGoal] = useState(selectedRoutine.goal);
const [success, setSuccess] = useState(false);

const  handleSubmit = async(event) => {
  event.preventDefault();
  const myRoutineObj ={ name: name,goal:goal};
   const result = updateRoutine(token, myRoutineObj,selectedRoutine.id);
   console.log("Updated Routine ", result);
   if(result !== null){ setSuccess(true);}

}

return (
  <>
    <h2>Update Routine</h2>
    <form onSubmit = {handleSubmit} id="add-routine-form">
    <div>{success? <p>Routine Successfully updated</p>: <p></p>}</div>
      <span>
        <label htmlFor=" name">Name</label>
        <input
          type="text"
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
                    <UpdateSingleActivityInRoutine activity={activity} token ={token} />
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
