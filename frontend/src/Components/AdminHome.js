import React, { useEffect, useState } from 'react';
import '../css/workStyles.css';
import axios from 'axios';

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [feedback, setFeedback] = useState({
    userId: '',
    performance: '',
    comment: '',
  });

  useEffect(() => {
    getAllUserData();
  }, []);

  const getAllUserData = async () => {
    const userData = await axios.get('http://localhost:8080/admin/getAllUsers');
    setData(userData.data);
  };

  const handleInputChange = (event) => {
    setFeedback({
      ...feedback,
      [event.target.name]: event.target.value,
    });
  };
//new
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Send feedback data to the backend API endpoint
      await axios.post('http://localhost:8080/admin/submitFeedback', feedback);

      // Clear the form input values
      setFeedback({
        userId: '',
        performance: '',
        comment: '',
      });

      // Display a success message or perform any desired actions
      console.log('Feedback submitted successfully!');
    } catch (error) {
      // Handle any errors that occur during form submission
      console.error('Error submitting feedback:', error);
    }
//over
  };

  return (
    <div className="grid-workStyles">
      <h1>All Users List</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Verified</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.verified ? 'Yes' : 'No'}</td>
                <td>
                  <button
                    onClick={() => setFeedback({ ...feedback, userId: user._id })}
                  >
                    Provide Feedback
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

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
          </form>
        </div>
      )}
    </div>
  );
}
