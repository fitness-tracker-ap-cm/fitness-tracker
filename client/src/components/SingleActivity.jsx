import React from "react";

const SingleActivity =  (props) => {
 const {activity} = props;
    return(
        <>
        <div>
         <p><b>Activity Name : </b>{activity.name}</p>
         <p>Description: {activity.description}</p>
         <p>Duration : {activity.duration}</p>
         <p>Count : {activity.count} </p>
         <br/>
        </div>
        </>
    );

}
export default SingleActivity;