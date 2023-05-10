import React, {useState} from "react";
import "./SingleRoutine.css";
import { updateRoutine } from "../api";


const ModifyRoutine = (props) => {
  const {selectedRoutine, token, currentUser} = props;
console.log(selectedRoutine, token, currentUser);
const [name, setName] = useState("");
const [goal, setGoal] = useState("");
const [success, setSuccess] = useState(false);

const  handleSubmit = async(event) => {
  event.preventDefault();
  const myRoutineObj ={ name: name,goal:goal};
   const result = updateRoutine(token, myRoutineObj,selectedRoutine.id);
   console.log("Updated Routine ", result);
   setName('');
   setGoal('');
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
          placeholder= {selectedRoutine.name}
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
          placeholder={selectedRoutine.goal}
          required
        /> 
      </span>
      <button type="submit">SAVE</button>
    </form>
  </>
);
};
export default ModifyRoutine;
