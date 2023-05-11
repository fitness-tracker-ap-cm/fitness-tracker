import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import "./SingleRoutine.css"
import { deleteRoutineActivity, updateRoutineActivity } from "../api";


const UpdateSingleActivityInRoutine = (props) => {
  const { activity, token , setAllActivities, allActivities} = props;
  const [duration, setDuration] = useState(activity.duration);
  const [count, setCount] = useState(activity.count);
  const navigate = useNavigate();
  const handleClick = async () => {
    const updatedActivity = await updateRoutineActivity(
      token,
      activity.routineActivityId,
      count,
      duration
    );
    if (updatedActivity !== null) {
      window.alert("Activity Updated Successfully");
    }
  };

  const handleDelete = async () => {
    const deletedActivity = await deleteRoutineActivity(
      token,
      activity.routineActivityId
    );
    if (deletedActivity !== null) {
      setAllActivities([
        ...allActivities.filter(
          (myActivity) => myActivity.id !== deletedActivity.id
        ),
      ]);
      navigate("/MyRoutines");
    }
  };

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
        <button id="view-modify-button" onClick ={() =>{handleDelete()}}>Delete this Activityy</button>
      </div>
    </>
  );
};
export default UpdateSingleActivityInRoutine;

