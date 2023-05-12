import React, {useState} from "react";
import { addActivityToRoutine } from "../api";
import './AddActivityToRoutine.css'

const AddActivityToRoutine = ({selectedRoutine, allActivities, token}) => {
 const [activityId, setActivityId] = useState(allActivities[0].id)
 const [count, setCount] = useState('')
 const [duration, setDuration] = useState('')


 const handleSubmit = async(event)=>{
    event.preventDefault()
    const response = await addActivityToRoutine(activityId, selectedRoutine.id, count, duration, token)
   console.log(response)
 }
 const handleChange = (e)=>{
    setActivityId(e.target.value)
 }


return (
<div className="addActivity-container">
<form onSubmit={handleSubmit}>
    <div className="dropdown-container">
    <label className="label">Choose an activity:</label>
        <select value={activityId} onChange={handleChange}>
        {allActivities.map((activity)=>{
        return(
        <option key={activity.id}value={activity.id}>{activity.name}</option>
        )})}
    </select>
    </div>
    <div className="input-container">

    <label>Count</label>
    <input type="text" placeholder="Enter a count" value={count} onChange={(e)=>{setCount(e.target.value)}}/>
    <label>Duration</label>
    <input type="text" placeholder="Enter a duration" value={duration} onChange={(e)=>{setDuration(e.target.value)}}/>
    <button>Create an activity for your routine</button>
    </div>
</form>
</div>
);
}
export default AddActivityToRoutine;