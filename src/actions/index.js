import * as actionTypes from "../constants/actionsTypes";

const getActionObj = (type, payload) => ({ type, payload });

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.USER_LOGIN_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/auth/signin`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then(user => {
        dispatch(getActionObj(actionTypes.USER_LOGIN_SUCCESS, { user }));
      }).catch(e => {
        console.log(e);
      });
  };
};

export const fetchAllUsers = () => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.GET_USERS_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/users/getAll`, {
      credentials: "include",
      mode: "cors"
    })
      .then(res => res.json())
      .then(data => {
        dispatch(getActionObj(actionTypes.GET_USERS_SUCCESS, { users: data.users }));
      });
  };
};

export const fetchUserProfile = userId => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.GET_USER_PROFILE_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/users/${userId}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(user => {
        dispatch(getActionObj(actionTypes.GET_USER_PROFILE_SUCCESS, { user }));
      });
  };
};

export const editFeedback = (feedbackId, message) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.EDIT_FEEDBACK_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/feedback/${feedbackId}`, {
      method: "POST",
      body: JSON.stringify({ message }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(user => {
        dispatch(getActionObj(actionTypes.EDIT_FEEDBACK_SUCCESS, { feedbackId, message }));
      });
  }
};

export const addUserToReview = (targetUserId, userId) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.ADD_USER_TO_REVIEW_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/feedback/addUser`, {
      method: "POST",
      body: JSON.stringify({ targetUserId, userId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(user => {
        dispatch(fetchAllUsers());
        dispatch(fetchUserProfile(user._id));
      });
  };
};

export const setShowCreateModal = (showModal) => getActionObj(actionTypes.SET_SHOW_CREATE_MODAL, { showModal });

export const registerUser = (name, email, password) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.REGISTER_USER_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/auth/signup`, {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(user => {
        dispatch(getActionObj(actionTypes.REGISTER_USER_SUCCESS, { user }));
      });
  };
};

export const submitFeedback = (userId, feedback) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.SUBMIT_FEEDBACK_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/feedback`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId, feedback })
    })
      .then(res => res.json())
      .then(user => {
        dispatch(getActionObj(actionTypes.SUBMIT_FEEDBACK_SUCCESS, { userId: user._id }));
      });
  };
};

export const signOutUser = () => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.SIGN_OUT_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/auth/signout`, {
      credentials: "include",
    })
      .then(res => res.json())
      .then(data => {
        dispatch(getActionObj(actionTypes.SIGN_OUT_SUCCESS));
      });
  };
};