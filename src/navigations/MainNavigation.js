import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

const { Navigator, Screen } = createNativeStackNavigator();

import LoginScreen from "../screens/LoginScreen";
import AppTabNavigation from "./AppTabNavigation";

const MainNavigation = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Screen name="AppTabNavigation" component={AppTabNavigation} />
      ) : (
        <Screen name="Login" component={LoginScreen} />
      )}
    </Navigator>
  );
};

export default MainNavigation;
