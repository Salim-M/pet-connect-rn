import React from "react";

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";

import { useTheme } from "react-native-paper";

import HomeNavigation from "./HomeNavigation";
import UserListingsNavigation from "./UserListingsNavigation";
import UserInfoNavigation from "./UserInfoNavigation";

const { Navigator, Screen } = createMaterialBottomTabNavigator();

const AppTabNavigation = () => {
  const { colors } = useTheme();
  return (
    <Navigator labeled={false} barStyle={{ backgroundColor: colors.primary }}>
      <Screen
        name="HomeNavigation"
        component={HomeNavigation}
        options={{ tabBarIcon: "home" }}
      />
      <Screen
        name="UserListingsNavigation"
        component={UserListingsNavigation}
        options={{ tabBarIcon: "format-list-bulleted" }}
      />
      <Screen
        name="UserInfo"
        component={UserInfoNavigation}
        options={{ tabBarIcon: "account" }}
      />
    </Navigator>
  );
};

export default AppTabNavigation;
