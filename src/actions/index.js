import * as actionTypes from "../constants/actionsTypes";

const getActionObj = (type, payload) => ({ type, payload });

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.USER_LOGIN_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/auth/signin`, {
      method: "POST",
      mode: "cors",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: "include",
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
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
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(user => {
        dispatch(getActionObj(actionTypes.EDIT_FEEDBACK_SUCCESS, { feedbackId, message }));
      });
  }
};