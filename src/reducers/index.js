import * as actionsTypes from "../constants/actionsTypes";

const getInitalState = () => (
  {
    users: [],
    currentUser: null,
    isLoading: false,
    userDetails: null,
    showCreateModal: false,
    signedOut: false
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
      };
    case actionsTypes.SET_SHOW_CREATE_MODAL:
      return {
        ...state,
        showCreateModal: payload.showModal
      }
    case actionsTypes.REGISTER_USER_START:
      return {
        ...state,
        isLoading: true
      };
    case actionsTypes.REGISTER_USER_SUCCESS:
      const users = state.users.concat(payload.user);
      return {
        ...state,
        isLoading: false,
        showCreateModal: false,
        users
      };
    case actionsTypes.SUBMIT_FEEDBACK_START:
      return {
        ...state,
        isLoading: true
      }
    case actionsTypes.SUBMIT_FEEDBACK_SUCCESS:
      const usersToReview = state.currentUser.usersToReview.filter(user => user._id !== payload.userId);
      let user = JSON.parse(JSON.stringify(state.currentUser));
      user.usersToReview = usersToReview;
      return {
        ...state,
        isLoading: false,
        currentUser: user
      }
    case actionsTypes.SIGN_OUT_START:
      return {
        ...state,
        isLoading: true
      }
    case actionsTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
        signedOut: true
      }
    default:
      return state;
  }
};

export default userReducer;