import * as SecureStore from "expo-secure-store";
import PetConnectApi from "./apis/PetConnectApi";

export const saveToken = async (token) => {
  await SecureStore.setItemAsync("token", token);
};

export const removeToken = async () => {
  await SecureStore.deleteItemAsync("token");
};

export const setAuthHeaders = (token) => {
  PetConnectApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const getInitials = (name) => {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("");
};
