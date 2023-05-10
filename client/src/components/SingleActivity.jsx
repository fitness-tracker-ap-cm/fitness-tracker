import React from "react";

const SingleActivity =  (props) => {
 const {activity} = props;
    return(
        <>
        <div>
         <p><b>Name : </b>{activity.name}</p>
         <p>Description: {activity.description}</p>
         <p>Duration : {activity.duration}</p>
         <p>Count : {activity.count} </p>
        </div>
        </>
    );

}
export default SingleActivity;