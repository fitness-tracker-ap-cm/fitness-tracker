import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createActivity } from "../api";

const CreateActivity = ({ token, setAllActivities, allActivities }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  console.log(setAllActivities);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newActivity = await createActivity(token, name, description);
    if (newActivity) {
      setAllActivities([newActivity, ...allActivities]);
      navigate("/Activities");
    } else {
      console.log("Please make a new request");
    }
  };
  return (
    <>
    <h2>Create an activity now!</h2>
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        placeholder="Name"
        value={name}
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <label>Description: </label>
      <input
        placeholder="description"
        value={description}
        type="text"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button type="submit">Create</button>
    </form>
    </>
  );
};

export default CreateActivity;
