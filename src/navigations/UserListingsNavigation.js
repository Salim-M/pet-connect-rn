import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddListing from "../screens/user/AddListing";
import Listings from "../screens/user/ListingsScreen";
import ImagePicker from "../screens/ImagePickerScreen";
import AppNavigationBar from "../components/common/AppNavigationBar";
import EditListingScreen from "../screens/user/EditListingScreen";

const { Navigator, Screen } = createNativeStackNavigator();

const UserListingsNavigation = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        header: (props) => <AppNavigationBar {...props} />,
      }}
    >
      <Screen name="Listings" component={Listings} />
      <Screen name="AddListing" component={AddListing} />
      <Screen
        name="ImagePicker"
        component={ImagePicker}
        options={{ headerShown: true }}
      />
      <Screen name="EditListing" component={EditListingScreen} />
      {/* <Screen name="ListingDetail" component={ListingDetail} /> */}
    </Navigator>
  );
};
export default UserListingsNavigation;
