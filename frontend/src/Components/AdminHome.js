import React, { useEffect, useState } from "react";
import "../css/workStyles.css";
import axios from "axios";

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState({
    userId: "",
    performance: "",
    comment: "",
  });

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    const userData = await axios.get(
      "http://localhost:8080/workout/getWorkouts"
    );
    setData(userData.data);
  };

  const handleInputChange = (event) => {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value,
    });
  };

  // Function to display the feedback in a new window
  const handleProvideFeedback = () => {
    const feedbackData = {
      comment: feedback.comment,
      performance: feedback.performance,
    };

    const feedbackWindow = window.open("", "_blank", "height=400,width=600");
    feedbackWindow.document.write(`
      <div style="padding: 20px;">
        <h1>This is feedback</h1>
        <p><strong>Performance:</strong> ${feedbackData.performance}</p>
        <p><strong>Comment:</strong> ${feedbackData.comment}</p>
      </div>
    `);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send feedback data to the backend API endpoint
      await axios.post("http://localhost:8080/admin/submitFeedback", feedback);

      // Clear the form input values
      setFeedback({
        userId: "",
        performance: "",
        comment: "",
      });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div>
      <h1>All Users List</h1>
      <div className="grid-workStyles">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User Name</th>
              <th>Workout Name</th>
              <th>Duration</th>
              <th>No. of Rounds</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.userName}</td>
                  <td>{user.workoutName}</td>
                  <td>{user.duration}</td>
                  <td>{user.numberOfRounds}</td>
                  <td>
                    <button
                      onClick={() =>
                        setFeedback({ ...feedback, userId: user.userId })
                      }
                    >
                      Provide Feedback
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Form */}
      {feedback.userId && (
        <div className="feedback-section">
          <h2>Provide Feedback</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="performance">Performance:</label>
              <input
                type="text"
                id="performance"
                name="performance"
                value={feedback.performance}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="comment">Comment:</label>
              <textarea
                id="comment"
                name="comment"
                value={feedback.comment}
                onChange={handleInputChange}
              ></textarea>
            </div>
            <button type="submit">Submit Feedback</button>
            <button type="button" onClick={handleProvideFeedback}>
              View Feedback
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
