import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  Button,
  Snackbar,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

import AppScreen from "../../components/common/AppScreen";
import * as Yup from "yup";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import PetConnectApi from "../../apis/PetConnectApi";
import { updateUserAddress } from "../../actions/userActions";

const AddressSchema = Yup.object().shape({
  address1: Yup.string()
    .min(8, "Address should be a minimum of 8 characters")
    .required("Required"),

  address2: Yup.string().min(8, "Address should be a minimum of 8 characters"),
  district: Yup.string()
    .min(4, "District should be a minimum of 4 characters")
    .required("Required"),

  city: Yup.string()
    .min(4, "City should be a minimum of 4 characters")
    .required("Required"),
});

const AddressScreen = () => {
  const { address } = useSelector((state) => state.entities.user.currentUser);
  const { colors } = useTheme();

  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handleUpdateAddress = (values, actions) => {
    PetConnectApi.post("/user/address", {
      _method: "put",
      ...values,
    }).then(() => {
      actions.setSubmitting(false);
      setVisible(true);
      dispatch(updateUserAddress(values));
    });
  };

  return (
    <AppScreen>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ backgroundColor: colors.primary, color: "#fff" }}
      >
        Address updated!
      </Snackbar>
      <Formik
        initialValues={{
          address1: address.address1 ?? "",
          address2: address.address2 ?? "",
          district: address.district ?? "",
          city: address.city ?? "",
        }}
        validationSchema={AddressSchema}
        onSubmit={handleUpdateAddress}
      >
        {({
          values,
          handleBlur,
          handleChange,
          errors,
          touched,
          handleSubmit,
          isSubmitting,
        }) => (
          <View style={styles.container}>
            <TextInput
              label="Primary Address"
              value={values.address1}
              onChangeText={handleChange("address1")}
              onBlur={handleBlur("address1")}
              error={touched.address1 && errors.address1}
            />
            {errors.address1 && touched.address1 && (
              <Text style={{ color: colors.error }}>{errors.address1}</Text>
            )}
            <TextInput
              label="Secondary Address"
              value={values.address2}
              onChangeText={handleChange("address2")}
              onBlur={handleBlur("address2")}
              error={touched.address2 && errors.address2}
              style={{ marginVertical: 8 }}
            />
            {errors.address2 && touched.address2 && (
              <Text style={{ color: colors.error }}>{errors.address2}</Text>
            )}
            <TextInput
              label="District"
              value={values.district}
              onChangeText={handleChange("district")}
              onBlur={handleBlur("district")}
              error={touched.district && errors.district}
            />
            {errors.district && touched.district && (
              <Text style={{ color: colors.error }}>{errors.district}</Text>
            )}
            <TextInput
              label="City"
              onChangeText={handleChange("city")}
              onBlur={handleBlur("city")}
              error={touched.city && errors.city}
              style={{ marginVertical: 8 }}
              value={values.city}
            />
            {errors.city && touched.city && (
              <Text style={{ color: colors.error }}>{errors.city}</Text>
            )}
            <Button
              loading={isSubmitting}
              onPress={handleSubmit}
              icon="content-save"
              mode="contained"
            >
              Save
            </Button>
          </View>
        )}
      </Formik>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default AddressScreen;
