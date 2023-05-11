import React, {useState} from "react";
import { addActivityToRoutine } from "../api";

const AddActivityToRoutine = ({selectedRoutine, allActivities, token}) => {
 const [activityId, setActivityId] = useState(0)
 const [count, setCount] = useState()
 const [duration, setDuration] = useState()


 const handleSubmit = async(event)=>{
    event.preventDefault()
    const response = await addActivityToRoutine(activityId, selectedRoutine.id, count, duration, token)
   console.log(response)
 }
 const handleChange = (e)=>{
    setActivityId(e.target.value)
 }

return (
<div>
<form onSubmit={handleSubmit}>
<div>
    <label>Choose an activity:</label>
    <select value={activityId} onChange={handleChange}>
    {allActivities.map((activity)=>{
    return(
        <option key={activity.id}value={activity.id}>{activity.name}</option>
    )})}
    </select>
    </div>
  
    <label>Count</label>
    <input type="number" placeholder="Enter a count" value={count} onChange={(e)=>{setCount(e.target.value)}}/>
    <label>Duration</label>
    <input type="number" placeholder="Enter a duration" value={duration} onChange={(e)=>{setDuration(e.target.value)}}/>
    <button>Create an activity for your routine</button>

</form>
</div>
);
}
export default AddActivityToRoutine;