import React, { useEffect, useState } from "react";
import {
  Text,
  Avatar,
  List,
  Title,
  Headline,
  TextInput,
  Button,
  useTheme,
  FAB,
  Banner,
} from "react-native-paper";
import { ScrollView, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { handleUpdateUser, loadUser } from "../../actions/userActions";
import AppScreen from "../../components/common/AppScreen";
import LoadingScreen from "../LoadingScreen";
import { getInitials, removeToken } from "../../utils";
import { Formik } from "formik";
import * as Yup from "yup";
import { authFailed } from "../../actions/authActions";

const UserSchema = Yup.object().shape({
  username: Yup.string()
    .min(4, "Username should be minimum 4 characters")
    .required("Username is required"),
  phone: Yup.string().min(8, "Phone should be minimum 8 characters"),
});

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const [bannerVisible, setBannerVisible] = useState(true);
  const { currentUser, isLoading } = useSelector(
    (state) => state.entities.user
  );

  useEffect(() => {
    if (!currentUser) dispatch(loadUser());
  }, []);

  const handleLogout = () => {
    removeToken();
    dispatch(authFailed());
  };

  if (isLoading) return <LoadingScreen />;

  return (
    <AppScreen>
      {!currentUser.address.address1 && (
        <Banner
          visible={bannerVisible}
          icon="alert"
          actions={[
            {
              label: "I Understand",
              onPress: () => setBannerVisible(false),
            },
          ]}
        >
          It seems like you didn't provide your address yet, it's recommended to
          go ahead and add your address to your account
        </Banner>
      )}
      <FAB
        style={[styles.fab, { backgroundColor: colors.primary, zIndex: 10 }]}
        icon={currentUser.address.address1 ? "pencil" : "plus"}
        label="My Address"
        onPress={() => navigation.navigate("Address")}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {currentUser.image ? (
            <Avatar.Image source={{ uri: currentUser.image }} size={95} />
          ) : (
            <Avatar.Text label={getInitials(currentUser.username)} size={95} />
          )}
          <View
            style={{
              flexDirection: "column",
              marginLeft: 22,
            }}
          >
            <Headline>{currentUser.username}</Headline>
            <Button
              icon="logout"
              mode="text"
              onPress={handleLogout}
              color={colors.error}
              compact
            >
              Logout
            </Button>
          </View>
        </View>
        <View style={{ width: "100%", padding: 10, marginTop: 30 }}>
          <Formik
            initialValues={{
              username: currentUser.username,
              phone: currentUser.phone ?? "",
            }}
            validationSchema={UserSchema}
            onSubmit={(values, actions) =>
              dispatch(handleUpdateUser(values, actions))
            }
          >
            {({
              handleBlur,
              handleChange,
              errors,
              values,
              touched,
              isSubmitting,
              handleSubmit,
            }) => (
              <>
                <TextInput
                  label="Username"
                  value={values.username}
                  error={errors.username && touched.username}
                  onBlur={handleBlur("username")}
                  onChangeText={handleChange("username")}
                />
                <TextInput
                  label="Email"
                  value={currentUser.email}
                  style={{ marginVertical: 8 }}
                  disabled
                />
                <TextInput
                  label="Phone"
                  value={values.phone ?? ""}
                  error={errors.phone && touched.phone}
                  onBlur={handleBlur("phone")}
                  onChangeText={handleChange("phone")}
                />
                <Button
                  mode="contained"
                  style={{ marginTop: 20 }}
                  icon="content-save"
                  loading={isSubmitting}
                  onPress={handleSubmit}
                >
                  Save
                </Button>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center",
    marginTop: 50,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 46,
  },
  fab2: {
    position: "absolute",
    right: 16,
    bottom: 96,
  },
});

export default Home;
