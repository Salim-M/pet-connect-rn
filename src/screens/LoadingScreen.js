import React from "react";
import { View, StyleSheet } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

const LoadingScreen = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <ActivityIndicator animating={true} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
