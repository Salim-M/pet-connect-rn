import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppNavigationBar from "../components/common/AppNavigationBar";
import HomeScreen from "../screens/HomeScreen";
import ListingDetail from "../screens/ListingDetails";
import { Appbar, Searchbar } from "react-native-paper";

const { Navigator, Screen } = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="Home" component={HomeScreen} />
      <Screen name="ListingDetail" component={ListingDetail} />
    </Navigator>
  );
};
export default HomeNavigation;
