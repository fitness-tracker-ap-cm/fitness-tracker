import React, { useState }from "react";
import "./MyRoutines.css";
import { createNewRoutine } from "../api";

const AddNewRoutine = (props) => {
  const {token } = props;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
 const [isPublic, setIsPublic] = useState(false); //is true unless box is checked

 const handleChange = () => {
  setIsPublic(!isPublic)
};
  const  handleSubmit = async(event) => {
    event.preventDefault();
    const myRoutineObj ={ name: name,goal:goal,isPublic: isPublic};
    const result = createNewRoutine(token,myRoutineObj);
    console.log("New Routine ", result);
  }

  return (
    <>
      <h2>Add a Routine</h2>
      <form onSubmit = {handleSubmit} id="add-routine-form">
        <span>
          <label htmlFor=" name">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Routine Name"
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
            placeholder="Enter a goal required"
            required
          /> <label htmlFor=" ispublic"> Check to make Private </label>
          <input
            type="checkbox"
            name="ispublic"
            checked={isPublic}
            onChange={handleChange}
          />
        </span>
        <button type="submit">CREATE</button>
      </form>


    </>
  );
};

export default AddNewRoutine;
