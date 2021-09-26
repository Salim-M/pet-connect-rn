import React from "react";
import { Appbar } from "react-native-paper";

const AppNavigationBar = ({ navigation, back, route, options }) => {
  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      <Appbar.Content title={options.title || route.name} />
      {options?.headerRight && <options.headerRight />}
    </Appbar.Header>
  );
};

export default AppNavigationBar;
