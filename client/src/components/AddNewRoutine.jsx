import React, { useState }from "react";
import "./MyRoutines.css";
import { createNewRoutine,getAllPublicRoutines} from "../api";

const AddNewRoutine = (props) => {
  const {token , setAllPublicRoutines , isLoggedIn , currentUser} = props;
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");

 const [isPublic, setIsPublic] = useState(true); //is true unless box is checked

 const handleChange = () => {
  setIsPublic(!isPublic);
 
};
  const  handleSubmit = async(event) => {
    event.preventDefault();
    const myRoutineObj ={ name: name,goal:goal,isPublic: isPublic};
    const newRoutine = await createNewRoutine(token,myRoutineObj);
    setName('');
    setGoal('');
    setIsPublic(true);
    if (newRoutine !== null) {
      window.alert("Routine Successfully created");

      let allRoutines = await getAllPublicRoutines();
      let filteredRoutines = [];
      if (!isLoggedIn) {
        filteredRoutines = allRoutines.filter((routine) => {
          return routine.isPublic === true || routine.isPublic === null;
        });
      } else {
        filteredRoutines = allRoutines.filter((routine) => {
          return (
            routine.isPublic === true ||
            routine.isPublic === null ||
            (routine.isPublic === false && routine.creatorName === currentUser)
          );
        });
      }

      setAllPublicRoutines(filteredRoutines);
    }
  }

  return (
    <>
    { isLoggedIn ? 
      <div>
        <h2>Add a Routine</h2>
        <form onSubmit = {handleSubmit} id="add-routine-form">
          <span>
            <label htmlFor=" name">Name</label>
            <input
              type="text"
              id="add-routine-input-name"
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
              id="add-routine-input-goal"
              name="goal"
              value={goal}
              onChange={(event) => setGoal(event.target.value)}
              placeholder="Enter a goal required"
              required
            /> <label htmlFor=" ispublic"> Check to make Private </label>
            <input
              type="checkbox"
              name="ispublic"
              checked={!isPublic}
              onChange={handleChange}
            />
          </span>
          <button type="submit">CREATE</button>
        </form>
      </div>
      :<div><h1>Unauthorized to View Page</h1></div>
    }
    </>
  );
};

export default AddNewRoutine;
