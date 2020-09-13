import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import StyledEmployee from "./styled/StyledEmployee";
import { submitFeedback } from "../actions";

const Employee = ({ currentUser, submitFeedback }) => {
  const history = useHistory();
  const [selectedUser, setSelectedUser] = useState(null);
  const [reviewIndex, setReviewIndex] = useState(Infinity);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (!currentUser || !Object.keys(currentUser).length) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    setFeedback('');
    setReviewIndex('');
    setSelectedUser(null);
  }, [currentUser]);

  const handleOnUserClick = (user, index) => {
    return () => {
      setFeedback('');
      setReviewIndex(index);
      setSelectedUser(user);
    };
  };

  const handleCancelClick = () => {
    setReviewIndex(Infinity);
    setFeedback('');
  };

  const handleSave = () => {
    if (!feedback) return;
    submitFeedback(selectedUser._id, feedback);
  };

  return (
    <>
      {currentUser &&
        <StyledEmployee>
          <h1>Welcome, {currentUser.name}</h1>
          {currentUser.usersToReview && !!currentUser.usersToReview.length ?
            <div className="user-review">
              <h3>Pending Reviews</h3>
              <ul className="users-list">
                {currentUser.usersToReview.map((user, index) => {
                  return (
                    <div className="user-item">
                      <li className="user-list-item" key={user._id} onClick={handleOnUserClick(user, index)}>{user.name}</li>
                      {reviewIndex === index && (
                        <div className="feedback-container">
                          <textarea className="feedback" placeholder="Enter the feedback" value={feedback} onChange={e => setFeedback(e.target.value)}></textarea>
                          <div className="btn-container">
                            <button className="btn save-btn" onClick={handleSave}>Save</button>
                            <button className="btn cancel-btn" onClick={handleCancelClick}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </ul>
            </div>
            :
            <h3 className="user-review">
              You don't have any pending reviews. Check back later!
            </h3>
          }
        </StyledEmployee>
      }
    </>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submitFeedback: (userId, feedback) => dispatch(submitFeedback(userId, feedback))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Employee);