import React from "react";
import "./SingleRoutine.css";
import { useNavigate } from "react-router-dom";
import { deleteRoutine } from "../api";

const SingleRoutineDetailedView = (props) => {
  const { routine , setSelectedRoutine, token, setMyRoutines, myRoutines, setAllPublicRoutines , allPublicRoutines} = props;
  const navigate = useNavigate();
  
 const handleClick = () => {
  setSelectedRoutine(routine);
  navigate('/ModifyRoutine');
 }

 const handleDelete = async () => {
  await deleteRoutine(token,routine.id );
  setMyRoutines([...myRoutines.filter((myRoutine)=> myRoutine.id !== routine.id) ]);
  setSelectedRoutine('');
  setAllPublicRoutines([...allPublicRoutines.filter((publicRoutine)=> publicRoutine.id !== routine.id) ]);
  navigate('/MyRoutines');
 }
  return (
    <div id ='single-routine-container'>
      <p><b>Routine name : </b>{routine.name}</p>
      <p>
        <b>Goal : </b>
        {routine.goal}
      </p>
      <button id ='view-modify-button' onClick={() => {handleClick();}}>Modify Routine</button>
      <button id ='view-modify-button' onClick = {() => {handleDelete()}}>Delete Routine</button>
    </div>
  );
};
export default SingleRoutineDetailedView;
