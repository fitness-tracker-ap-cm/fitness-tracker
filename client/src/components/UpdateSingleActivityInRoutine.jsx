import React,{useState} from "react";
import "./SingleRoutine.css"
import { updateRoutineActivity } from "../api";


const UpdateSingleActivityInRoutine = (props) => {
  const { activity, token } = props;
  const [duration, setDuration] = useState(activity.duration);
  const [count, setCount] = useState(activity.count);
  
  const handleClick = async () =>{
    const updatedActivity = await updateRoutineActivity(token,activity.routineActivityId,count,duration );
    if(updatedActivity !== null){
      window.alert("Activity Updated Successfully");
    }
  }

  return (
    <>
      <div>
        <p>
          <b>Name : </b>
          {activity.name}
        </p>
        <p>Description: {activity.description}</p>
        <label htmlFor=" name">Duration</label>
        <input
          type="text"
          name="duration"
          value={duration}
          onChange={(event) => setDuration(event.target.value)}
        />
         <label htmlFor=" count">Count</label>
        <input
          type="text"
          name="count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
        <button onClick={() => {handleClick();}}>Update Activity</button>
        <button id="view-modify-button">Delete this Activityy</button>
      </div>
    </>
  );
};
export default UpdateSingleActivityInRoutine;

