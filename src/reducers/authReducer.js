import {
  AUTH_FAILED,
  AUTH_LOADING,
  AUTH_SUCCESS,
  SET_USER,
} from "../actions/types";

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  token: null,
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_FAILED:
      return {
        ...state,
        isLoading: false,
        currentUser: null,
      };
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
