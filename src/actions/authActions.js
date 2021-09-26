import { AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS } from "./types";
import PetConnectApi from "../apis/PetConnectApi";
import * as SecureStore from "expo-secure-store";
import { saveToken, setAuthHeaders } from "../utils";

export const authLoading = () => ({
  type: AUTH_LOADING,
});

export const authSuccess = (token) => ({
  type: AUTH_SUCCESS,
  payload: token,
});

export const authFailed = () => ({
  type: AUTH_FAILED,
});

// export const checkAuth = async () => (dispatch) => {
//   dispatch(authLoading());
//   const token = await SecureStore.getItemAsync("token");
//   if (token) {
//     setAuthHeaders(token);
//     dispatch(authSuccess(token));
//   }
//   dispatch(authFailed());
//   return Promise.resolve();
// };

export const handleLogin = (values, actions) => (dispatch, getState) => {
  dispatch(authLoading());
  PetConnectApi.post("/auth/login", values)
    .then((res) => {
      const { access_token: token } = res.data;
      // console.log(data);
      dispatch(authSuccess(token));
      saveToken(token);
      setAuthHeaders(token);
    })
    .catch(() => {
      dispatch(authFailed());
      actions.setSubmitting(false);
      actions.setFieldError("email", "Please check your credentials");
    });
};
