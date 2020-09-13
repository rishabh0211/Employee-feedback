import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { FiEdit } from "react-icons/fi";
import StyledDashboard from "./styled/StyledDashboard";
import { fetchAllUsers, fetchUserProfile, editFeedback, addUserToReview } from "../actions";

const Dashboard = ({ users, currentUser, fetchAllUsers, fetchUserProfile, userDetails, editFeedback, isLoading, addUserToReview }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showDropdownList, setShowDropdownList] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editIndex, setEditIndex] = useState(Infinity);
  const [editText, setEditText] = useState('');
  const [employeeToAssign, setEmployeeToAssign] = useState('');

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    setEditIndex(Infinity);
    setEditText('');
  }, [isLoading]);

  const handleSearchChange = e => {
    setSelectedUser(null);
    const val = e.target.value;
    setSearchValue(val);
    setUsers(val);
  };

  const setUsers = val => {
    let searchedUsers = [];
    setShowDropdownList(false);
    if (val) {
      searchedUsers = users.filter(user => user.name.toLowerCase().includes(val.toLowerCase()) && user.name !== currentUser.name);
      setShowDropdownList(true);
    }
    setSearchedUsers(searchedUsers);
  };

  const handleSelectUser = user => {
    return () => {
      setSelectedUser(user);
      setShowDropdownList(false);
    };
  };

  const handleSearchClick = () => {
    // let userSelected = users.filter(user => user._id === selectedUser._id);
    // userSelected = userSelected && userSelected[0];
    // setUserDetails(userSelected);
    fetchUserProfile(selectedUser._id);
  };

  const handleFeedbackEdit = (feedback, index) => {
    return () => {
      setEditIndex(index);
      setEditText(feedback.feedback);
    };
  };

  const cancelFeedbackEdit = () => {
    setEditIndex(Infinity);
    setEditText('');
  };

  const handleSaveFeedback = (feedback) => {
    return () => {
      editFeedback(feedback._id, editText);
    };
  };

  const handleAssignEmployeeClick = () => {
    if (!employeeToAssign) return ;
    addUserToReview(userDetails._id, employeeToAssign);
  };

  const canReview = userId => {
    const users = userDetails.usersToReview;
    for (let i=0; i<users.length; i++) {
      if (users[i]._id === userId) {
        return false;
      }
    }
    return true;
  };

  return (
    <StyledDashboard>
      <h1 className="dashboard-title">Dashboard</h1>
      <div className="search-container">
        <div className="search-dropdown">
          <input
            type="text"
            name="search"
            id="search"
            className="search-input"
            value={selectedUser ? selectedUser.name : searchValue}
            onChange={handleSearchChange}
            autoComplete="off"
            // onBlur={handleInputBlur}
            onFocus={() => setShowDropdownList(true)}
          />
          {showDropdownList && !!searchedUsers.length &&
            <ul className="dropdown-list">
              {searchedUsers.map(user => (
                <li className="user-item" key={user.email} onClick={handleSelectUser(user)}>{user.name}</li>
              ))}
            </ul>
          }
        </div>
        <button className="search-btn" disabled={!selectedUser} onClick={handleSearchClick}>Search</button>
      </div>

      {/* USER SECTION -- to be moved as a separate component **/}
      {userDetails &&
        <div className="user-description">
          <section className="user-details">
            <table cellPadding="8" cellSpacing="4">
              <tbody>
                <tr>
                  <td>Name:</td>
                  <td>{userDetails.name}</td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>{userDetails.email}</td>
                </tr>
                {userDetails.usersToReview && !!userDetails.usersToReview.length &&
                  <tr>
                    <td>Pending Reviews</td>
                    <td>
                      {userDetails.usersToReview.map((user, index) => {
                        return index === 0 ? user.name : `, ${user.name}`
                      })}
                    </td>
                  </tr>
                }
              </tbody>
            </table>

            {/* ADD EMPLOYEE TO REVIEW SECTION  -- to be moved as a separate component**/}
            <div className="assign-employee-section">
              <h3>Add employees to review</h3>
              <div className="assign-dropdown">
                <select name="assign-employee" id="assign-employee" value={employeeToAssign} onChange={e => setEmployeeToAssign(e.target.value)}>
                  <option value=''>Select</option>
                  {users && !!users.length && users.map(user => {
                    if (!user.admin && user._id !== userDetails._id && canReview(user._id)) {
                      return <option className="user-item" value={user._id} key={user.email}>{user.name}</option>
                    }
                  })}
                </select>
                <button className="add-btn" onClick={handleAssignEmployeeClick}>Add</button>
              </div>
            </div>
            {/* ADD EMPLOYEE TO REVIEW END**/}

            {/* FEEDBACK SECTION -- to be moved as a separate component**/}
            <div className="feedbacks-container">
              <h3>Feedbacks Received</h3>
              {userDetails.feedbacks && !!userDetails.feedbacks.length &&
                <ul className="feedback-list">
                  {userDetails.feedbacks.map((feedback, index) => (
                    <li className="feedback-item" key={feedback._id}>
                      {index === editIndex ?
                        <>
                          <textarea className="feedback-textarea" value={editText} onChange={e => setEditText(e.target.value)}></textarea>
                          <div className="btn-container">
                            <button className="save-btn" onClick={handleSaveFeedback(feedback)}>Save</button>
                            <button className="cancel-btn" onClick={cancelFeedbackEdit}>Cancel</button>
                          </div>
                        </>
                        :
                        <>
                          <FiEdit className="feedback-edit icon" onClick={handleFeedbackEdit(feedback, index)} />
                          <p className="feedback">{feedback.feedback}</p>
                          <p className="feedback-user">By {feedback.user.name}</p>
                        </>
                      }
                    </li>
                  ))}
                </ul>
              }
            </div>
            {/* FEEDBACK SECTION END **/}
          </section>
        </div>
      }
    </StyledDashboard>
  )
}

const mapStateToProps = state => {
  console.log(state);
  return {
    users: state.users,
    currentUser: state.currentUser,
    userDetails: state.userDetails,
    isLoading: state.isLoading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    fetchUserProfile: userId => dispatch(fetchUserProfile(userId)),
    editFeedback: (feedbackId, text) => dispatch(editFeedback(feedbackId, text)),
    addUserToReview: (targetUserId, userId) => dispatch(addUserToReview(targetUserId, userId))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);