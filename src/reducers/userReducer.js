import {
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
  USER_LOADED,
  USER_LOADING,
} from "../actions/types";

const initialState = {
  isLoading: true,
  currentUser: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        },
      };
    case UPDATE_USER_ADDRESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          address: {
            ...action.payload,
          },
        },
      };
    default:
      return state;
  }
};

export default userReducer;
