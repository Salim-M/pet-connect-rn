import React from "react";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import Constants from "expo-constants";

const AppScreen = ({ children }) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
});

export default AppScreen;
