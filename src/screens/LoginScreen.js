import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";

import { handleLogin } from "../actions/authActions";

import AppScreen from "../components/common/AppScreen";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password should be minimum 8 characters")
    .required("Password is required"),
});

const LoginScreen = () => {
  const { colors } = useTheme();
  const dispatch = useDispatch();

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={{ width: "100%" }}>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={(values, actions) =>
              dispatch(handleLogin(values, actions))
            }
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              errors,
              touched,
            }) => (
              <>
                <TextInput
                  label="Email"
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  autoCapitalize="none"
                  error={errors.email && touched.email}
                />
                {errors.email && touched.email && (
                  <Text style={{ color: colors.error }}>{errors.email}</Text>
                )}
                <TextInput
                  label="Password"
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  error={errors.password && touched.password}
                  autoCompleteType="password"
                  textContentType="password"
                  secureTextEntry
                  autoCapitalize="none"
                  style={{ marginTop: 5 }}
                />
                {errors.password && touched.password && (
                  <Text style={{ color: colors.error }}>{errors.password}</Text>
                )}
                <Button
                  mode="contained"
                  icon="login"
                  loading={isSubmitting}
                  onPress={handleSubmit}
                  style={{ marginTop: 20 }}
                >
                  Login
                </Button>
              </>
            )}
          </Formik>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
