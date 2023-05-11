import React, {useState} from "react";
import { addActivityToRoutine } from "../api";

const AddActivityToRoutine = ({selectedRoutine, allActivities, token}) => {
console.log(selectedRoutine)
 const [activityId, setActivityId] = useState(0)
 const [count, setCount] = useState(0)
 const [duration, setDuration] = useState(0)
 console.log(activityId, count, duration)

 const handleSubmit = async(event)=>{
    event.preventDefault()
    const response = await addActivityToRoutine(activityId, selectedRoutine.id, count, duration, token)
   console.log(response)
 }

return (
<div>
<form onSubmit={handleSubmit}>
    <label>Enter Activity Id</label>
    <input type="numner" placeholder="Enter an activityId" value={activityId} onChange={(e)=>{setActivityId(e.target.value)}}/>
    <label>Count</label>
    <input type="number" placeholder="Enter a count" value={count} onChange={(e)=>{setCount(e.target.value)}}/>
    <label>Duration</label>
    <input type="number" placeholder="Enter a duration" value={duration} onChange={(e)=>{setDuration(e.target.value)}}/>
    <button>Create an activity for your routine</button>

</form>
<h1>Create your own routine by selecting one of ActivityId! </h1>
    {allActivities.map((activity)=>{
        return(
            <div key={activity.id}>
                <p>Activity Id: {activity.id}</p>
                <h1>{activity.name}</h1>
                <p>{activity.description}</p>
            </div>
        )
    })}
</div>
);
}
export default AddActivityToRoutine;