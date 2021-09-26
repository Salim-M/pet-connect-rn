import { Picker } from "@react-native-picker/picker";
import { Formik } from "formik";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Platform, ScrollView } from "react-native";
import {
  Button,
  List,
  Snackbar,
  Switch,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import PetConnectApi from "../../apis/PetConnectApi";
import AppScreen from "../../components/common/AppScreen";
import LoadingScreen from "../LoadingScreen";

import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/core";

const ListingSchema = Yup.object().shape({
  name: Yup.string()
    .min(4, "Name should be minimum 4 characters")
    .required("Name is required"),
  description: Yup.string()
    .min(30, "Description should be minimum 30 characters")
    .required("Description is required"),
  price: Yup.number(),
  animal_id: Yup.string().required("Animal is required"),
  has_address: Yup.boolean(),
  address1: Yup.string()
    .min(8, "Address should be a minimum of 8 characters")
    .when("has_address", { is: true, then: Yup.string().required("Required") }),
  address2: Yup.string().min(8, "Address should be a minimum of 8 characters"),
  district: Yup.string()
    .min(4, "District should be a minimum of 4 characters")
    .when("has_address", { is: true, then: Yup.string().required("Required") }),
  city: Yup.string()
    .min(4, "City should be a minimum of 4 characters")
    .when("has_address", { is: true, then: Yup.string().required("Required") }),
});

const AddListing = ({ route }) => {
  const mounted = useRef();

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [pickedImages, setPickedImages] = useState([]);

  const { colors } = useTheme();
  const navigation = useNavigation();

  const createImageObject = (value) => ({
    uri: Platform.OS === "android" ? value : value.replace("file://", ""),
    name: `dummy${Date.now()}.jpg`,
    type: "image/*",
  });

  const handleCreateListing = (values, actions) => {
    let data = new FormData();
    Object.keys(values).forEach((k) => data.append(k, values[k]));
    pickedImages.forEach((value) =>
      data.append(`images[]`, createImageObject(value))
    );

    data.append("has_address", values.has_address ? 1 : 0);

    PetConnectApi.post("/listings", data).then((res) => {
      setVisible(true);
      actions.setSubmitting(false);
    });
  };

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
      const params = route.params;
      if (params?.photos) {
        const photosArray = [...params.photos.map((p) => p.uri)];
        setPickedImages(photosArray);
        delete params.photos;
      }
    }
  });

  useEffect(() => {
    PetConnectApi.get("/animals").then((res) => {
      setAnimals(res.data.animals);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AppScreen>
      <ScrollView contentContainerStyle={{ padding: 10, flex: 1 }}>
        <Formik
          initialValues={{
            name: "",
            description: "",
            price: "",
            animal_id: animals[0]?.id,
            has_address: false,
            address1: "",
            address2: "",
            district: "",
            city: "",
          }}
          validationSchema={ListingSchema}
          onSubmit={(values, actions) => {
            if (pickedImages.length === 0) {
              actions.setSubmitting(false);
              return alert("Please select some images first!");
            }
            handleCreateListing(values, actions);
          }}
        >
          {({
            handleBlur,
            handleChange,
            values,
            errors,
            touched,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <>
              <TextInput
                label="Name"
                value={values.name}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                error={touched.name && errors.name}
              />
              {errors.name && touched.name && (
                <Text style={{ color: colors.error }}>{errors.name}</Text>
              )}
              <TextInput
                label="Description"
                value={values.description}
                onChangeText={handleChange("description")}
                onBlur={handleBlur("description")}
                error={touched.description && errors.description}
                numberOfLines={50}
              />
              {errors.description && touched.description && (
                <Text style={{ color: colors.error }}>
                  {errors.description}
                </Text>
              )}
              <TextInput
                label="Price"
                value={values.price}
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                error={touched.price && errors.price}
                keyboardType="numeric"
              />
              {errors.price && touched.price && (
                <Text style={{ color: colors.error }}>{errors.price}</Text>
              )}
              {/* <Text>Animal type</Text> */}
              <Picker
                selectedValue={values.animal_id}
                onValueChange={(itemValue, itemIndex) =>
                  setFieldValue("animal_id", itemValue)
                }
              >
                {animals.map((animal) => (
                  <Picker.Item
                    label={animal.name}
                    value={animal.id}
                    key={animal.id}
                  />
                ))}
              </Picker>
              {errors.animal_id && touched.animal_id && (
                <Text style={{ color: colors.error }}>{errors.animal_id}</Text>
              )}
              <List.Item
                style={{ paddingLeft: 0 }}
                title="Use my address"
                description="Whether to provide your own address, or use your current address"
                right={() => (
                  <Switch
                    value={!values.has_address}
                    onValueChange={() =>
                      setFieldValue("has_address", !values.has_address)
                    }
                    color={colors.primary}
                  />
                )}
              />

              {values.has_address && (
                <>
                  <TextInput
                    label="Primary Address"
                    value={values.address1}
                    onChangeText={handleChange("address1")}
                    onBlur={handleBlur("address1")}
                    error={touched.address1 && errors.address1}
                  />
                  {errors.address1 && touched.address1 && (
                    <Text style={{ color: colors.error }}>
                      {errors.address1}
                    </Text>
                  )}
                  <TextInput
                    label="Secondary Address"
                    value={values.address2}
                    onChangeText={handleChange("address2")}
                    onBlur={handleBlur("address2")}
                    error={touched.address2 && errors.address2}
                  />
                  {errors.address2 && touched.address2 && (
                    <Text style={{ color: colors.error }}>
                      {errors.address2}
                    </Text>
                  )}
                  <TextInput
                    label="District"
                    value={values.district}
                    onChangeText={handleChange("district")}
                    onBlur={handleBlur("district")}
                    error={touched.district && errors.district}
                  />
                  {errors.district && touched.district && (
                    <Text style={{ color: colors.error }}>
                      {errors.district}
                    </Text>
                  )}
                  <TextInput
                    label="City"
                    value={values.city}
                    onChangeText={handleChange("city")}
                    onBlur={handleBlur("city")}
                    error={touched.city && errors.city}
                  />
                  {errors.city && touched.city && (
                    <Text style={{ color: colors.error }}>{errors.city}</Text>
                  )}
                </>
              )}

              <Button
                icon="camera"
                onPress={() => navigation.navigate("ImagePicker")}
                style={{ marginVertical: 5 }}
              >
                Select images
              </Button>

              <Button
                mode="contained"
                icon="content-save"
                loading={isSubmitting}
                onPress={() => handleSubmit()}
              >
                Create
              </Button>
            </>
          )}
        </Formik>
      </ScrollView>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        style={{ backgroundColor: colors.primary, color: "#fff" }}
      >
        Listing created!
      </Snackbar>
    </AppScreen>
  );
};

export default AddListing;
