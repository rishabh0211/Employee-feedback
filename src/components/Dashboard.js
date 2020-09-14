import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import StyledDashboard from "./styled/StyledDashboard";
import { fetchAllUsers, fetchUserProfile, editFeedback, addUserToReview, setShowCreateModal } from "../actions";
import CreateEmployee from "./CreateEmployee";

/**
 * Dashboard Component for Admin only
 */
const Dashboard = ({ users, currentUser, fetchAllUsers, fetchUserProfile, userDetails, editFeedback, isLoading, addUserToReview, setShowCreateModal }) => {
  const history = useHistory();
  // Tracks the search value
  const [searchValue, setSearchValue] = useState('');
  // Contains users matching the search value
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [showDropdownList, setShowDropdownList] = useState(false);
  // Contains the selected user from the dropdown
  const [selectedUser, setSelectedUser] = useState(null);
  // Contains the index of the feedback being editted
  const [editIndex, setEditIndex] = useState(Infinity);
  // Contains the edit text for the feedback
  const [editText, setEditText] = useState('');
  // Contains the employee selectd from the add to review dropdown
  const [employeeToAssign, setEmployeeToAssign] = useState('');

  useEffect(() => {
    if (!currentUser || !Object.keys(currentUser).length) {
      return history.push('/');
    }
    fetchAllUsers();
  }, []);

  // Updates searched users whenever the store changes users
  useEffect(() => {
    const userList = users.filter(user => user._id !== currentUser._id);
    setSearchedUsers(userList);
  }, [users]);

  useEffect(() => {
    setEditIndex(Infinity);
    setEditText('');
  }, [isLoading]);

  /**
   * Handles changes in the search user input
   */
  const handleSearchChange = e => {
    setSelectedUser(null);
    const val = e.target.value;
    setSearchValue(val);
    setUsers(val);
  };

  /**
   * Sets the users dropdown based on the serached input
   */
  const setUsers = val => {
    let searchedUsers = users;
    searchedUsers = users.filter(user => user.name.toLowerCase().includes(val.toLowerCase()) && user.name !== currentUser.name);
    setSearchedUsers(searchedUsers);
  };

  /**
   * Function triggered when user is selected from the search dropdown
   */
  const handleSelectUser = user => {
    return () => {
      setSelectedUser(user);
      setShowDropdownList(false);
    };
  };

  /**
   * Gets the profile information of the selected user
   */
  const handleSearchClick = () => {
    fetchUserProfile(selectedUser._id);
  };

  /**
   * Handles the click on feedback edit icon
   * @param {Object} feedback 
   * @param {number} index 
   */
  const handleFeedbackEdit = (feedback, index) => {
    return () => {
      setEditIndex(index);
      setEditText(feedback.feedback);
    };
  };

  /**
   * cancels the feedback edit
   */
  const cancelFeedbackEdit = () => {
    setEditIndex(Infinity);
    setEditText('');
  };

  /**
   * Makes the api call to save the modified feedback
   * @param {Object} feedback 
   */
  const handleSaveFeedback = (feedback) => {
    return () => {
      editFeedback(feedback._id, editText);
    };
  };

  /**
   * Handles the click on add employee to review. Makes the api call
   */
  const handleAssignEmployeeClick = () => {
    if (!employeeToAssign) return;
    addUserToReview(userDetails._id, employeeToAssign);
  };

  /**
   * Checks whether a given user can be added to the current user's review list
   * @param {String} userId 
   */
  const canReview = userId => {
    const users = userDetails.usersToReview;
    for (let i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        return false;
      }
    }
    return true;
  };

  /**
   * Handles create employee click. Opens the create modal
   */
  const handleCreateEmployee = () => {
    setShowCreateModal(true);
  };

  return (
    <StyledDashboard>
      <div className="header">
        <h1 className="dashboard-title">Dashboard</h1>
        <button className="create-btn" onClick={handleCreateEmployee}>Create Employee</button>
      </div>
      <h3 className="user-name">Hello {currentUser && currentUser.name}</h3>

      {/** Search User Container */}
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
            placeholder="Type the name here"
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
      <CreateEmployee />
    </StyledDashboard>
  )
}

const mapStateToProps = state => {
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
    addUserToReview: (targetUserId, userId) => dispatch(addUserToReview(targetUserId, userId)),
    setShowCreateModal: (showModal) => dispatch(setShowCreateModal(showModal))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);