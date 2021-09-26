import React, { useState } from "react";
import MainNavigation from "./navigations/MainNavigation";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useDispatch } from "react-redux";
import { authFailed, authSuccess } from "./actions/authActions";
import { setAuthHeaders } from "./utils";
import * as SecureStore from "expo-secure-store";

const App = () => {
  const [ready, setReady] = useState(false);

  const dispatch = useDispatch();

  const checkAuth = async () => {
    const token = await SecureStore.getItemAsync("token");
    if (token) {
      setAuthHeaders(token);
      dispatch(authSuccess(token));
    } else {
      dispatch(authFailed());
    }
    return Promise.resolve();
  };

  if (!ready)
    return (
      <AppLoading
        startAsync={checkAuth}
        onFinish={() => setReady(true)}
        onError={(err) => console.log(err)}
      />
    );
  return (
    <NavigationContainer>
      <MainNavigation />
    </NavigationContainer>
  );
};

export default App;
