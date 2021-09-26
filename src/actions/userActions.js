import PetConnectApi from "../apis/PetConnectApi";
import { removeToken } from "../utils";
import { authFailed } from "./authActions";
import {
  UPDATE_USER,
  UPDATE_USER_ADDRESS,
  USER_LOADED,
  USER_LOADING,
} from "./types";

export const userLoading = () => ({
  type: USER_LOADING,
});

export const userLoaded = (user) => ({
  type: USER_LOADED,
  payload: user,
});

export const updateUser = (values) => ({
  type: UPDATE_USER,
  payload: values,
});

export const updateUserAddress = (address) => ({
  type: UPDATE_USER_ADDRESS,
  payload: address,
});

export const loadUser = () => (dispatch) => {
  dispatch(userLoading());
  PetConnectApi.get("/user")
    .then((res) => {
      //   console.log(res.data);
      dispatch(userLoaded(res.data));
    })
    .catch(() => {
      dispatch(authFailed());
      removeToken();
    });
};

export const handleUpdateUser = (values, actions) => (dispatch) => {
  PetConnectApi.post("/user", {
    _method: "put",
    ...values,
  }).then(() => {
    dispatch(updateUser(values));
    actions.setSubmitting(false);
  });
};
