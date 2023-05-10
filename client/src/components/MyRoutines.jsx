import React, { useState,useEffect } from "react";
import {useNavigate} from "react-router-dom";
import "./MyRoutines.css";
import { getRoutinesByCurrentUser } from "../api";
import SingleRoutineDetailedView from './SingleRoutineDetailedView'

const MyRoutines = (props) => {
  const {token,currentUser,selectedRoutine, setSelectedRoutine} = props;
 const [myRoutines, setMyRoutines] = useState([]);
 const navigate = useNavigate();

 useEffect(() => {
   const getMyRoutines = async () => {
     try {
       let userRoutines = await getRoutinesByCurrentUser(token, currentUser);
       if (userRoutines.length) {
         setMyRoutines(userRoutines);
       }
     } catch (error) {
       console.error(error);
     }
   };
   getMyRoutines();
 }, []);

 const handleClick = () => {
   navigate('/AddNewRoutine');
 };

  return (
    <>
      <button onClick={() => {handleClick();}}>Add New Post</button>
      <h1> My Routines</h1>
      {myRoutines.length ? (
        <div>
          {myRoutines.map((routine, index) => {
            return (
              <div key={index}>
                <SingleRoutineDetailedView token = {token} routine = {routine} selectedRoutine = {selectedRoutine} setSelectedRoutine = {setSelectedRoutine} setMyRoutines = {setMyRoutines} myRoutines = {myRoutines}/>
              </div>
            );
          })}
        </div>
      ) : (
        <div>You have no routines to display. Time to Routine Up!</div>
      )}
    </>
  );
};

export default MyRoutines;
