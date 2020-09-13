import * as actionTypes from "../constants/actionsTypes";

const getActionObj = (type, payload) => ({ type, payload });

export const loginUser = (email, password) => {
  return dispatch => {
    dispatch(getActionObj(actionTypes.USER_LOGIN_START));
    return fetch(`${actionTypes.API_ENDPOINT}/api/auth/signin`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
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