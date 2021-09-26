import React from "react";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { Provider } from "react-redux";

import store from "./src/store";

import App from "./src/App";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1d4ed8",
  },
};

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </Provider>
  );
}
