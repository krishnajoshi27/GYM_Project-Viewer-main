import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
const Notification = () => {
  const userid = localStorage.getItem("userId");
  const [feedBack, setFeedback] = useState("");

  useEffect(() => {
    getfeedback();
  }, []);

  const getfeedback = async () => {
    const feedback = await axios.get(
      `http://localhost:8080/workout/getfeedbacks/${userid}`
    );
    console.log(feedback);
    setFeedback(feedback.data);
  };
  return (
    <>
      <h1>This is feedback of user</h1>
      <thead>
        <tr>
          <th>Comment</th>
          <th>Performance</th>
        </tr>
      </thead>
      {feedBack &&
        feedBack.map((f) => (
          <tr key={f._id}>
            <td>{f.comment}</td>
            <td>{f.performance}</td>
          </tr>
        ))}
    </>
  );
};
export default Notification;
