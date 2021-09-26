import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddressScreen from "../screens/user/AddressScreen";
import Home from "../screens/user/HomeScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const UserInfoNavigation = () => {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="Address" component={AddressScreen} />
    </Navigator>
  );
};

export default UserInfoNavigation;
