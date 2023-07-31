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
<div className="feedback-section">
    <h1 className="feedback-title">Feedback from Users</h1>
    <table className="feedback-table">
      <thead>
        <tr>
          <th>Comment</th>
          <th>Performance</th>
        </tr>
      </thead>
      <tbody>
        {feedBack &&
          feedBack.map((f) => (
            <tr key={f._id}>
              <td>{f.comment}</td>
              <td>{f.performance}</td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
    </>
  );
};
export default Notification;
