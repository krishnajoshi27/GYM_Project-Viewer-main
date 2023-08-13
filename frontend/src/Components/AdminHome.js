import React, { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import "../css/workStyles.css";

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

  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  const handleProvideFeedback = (user) => {
    setFeedback({ ...feedback, userId: user.userId });
    setIsFeedbackModalOpen(true);
  };

  const handleFeedbackModalClose = () => {
    setIsFeedbackModalOpen(false);
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

      // Close the modal
      setIsFeedbackModalOpen(false);
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
                      onClick={() => handleProvideFeedback(user)}
                    >
                      Provide Feedback
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Feedback Form Modal */}
      <Modal
        open={isFeedbackModalOpen}
        onClose={handleFeedbackModalClose}
        aria-labelledby="feedback-modal-title"
        aria-describedby="feedback-modal-description"
        className="centered-modal"
      >
        <div className="feedback-modal">
        <div className="feedback-modal-content">
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
          </form>
        </div>
        </div>
      </Modal>
    </div>
  );
}