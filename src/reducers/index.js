import * as actionsTypes from "../constants/actionsTypes";

const getInitalState = () => (
  {
    users: [],
    currentUser: null,
    isLoading: false
  }
);

const userReducer = (state = getInitalState(), { type, payload }) => {
  switch (type) {
    case actionsTypes.USER_LOGIN_START:
      return {
        ...state,
        isLoading: true
      };
    case actionsTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: payload.user
      };
    default:
      return state;
  }
};

export default userReducer;