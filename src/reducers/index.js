import * as actionsTypes from "../constants/actionsTypes";

const getInitalState = () => (
  {
    users: [],
    currentUser: null,
    isLoading: false,
    userDetails: null,
  }
);

let userDetails;

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
    case actionsTypes.GET_USERS_START:
      return {
        ...state,
        isLoading: true
      };
    case actionsTypes.GET_USERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: payload.users
      };
    case actionsTypes.GET_USER_PROFILE_START:
      return {
        ...state,
        isLoading: true
      };
    case actionsTypes.GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userDetails: payload.user
      };
    case actionsTypes.EDIT_FEEDBACK_START:
      return {
        ...state,
        isLoading: true
      };
    case actionsTypes.EDIT_FEEDBACK_SUCCESS:
      userDetails = JSON.parse(JSON.stringify(state.userDetails));
      userDetails.feedbacks.forEach(feedback => {
        if (feedback._id === payload.feedbackId) {
          feedback.feedback = payload.message;
        }
      });
      return {
        ...state,
        isLoading: false,
        userDetails
      };
    case actionsTypes.ADD_USER_TO_REVIEW_START:
      return {
        ...state,
        isLoading: true,
      }
    case actionsTypes.ADD_USER_TO_REVIEWS_SUCCESS:
      userDetails = JSON.parse(JSON.stringify(state.userDetails));
      // userDetails.usersToReview;
      return {
        ...state,
        isLoading: false,
      }
    default:
      return state;
  }
};

export default userReducer;