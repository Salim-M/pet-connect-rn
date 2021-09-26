import { useNavigation, useRoute } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import {
  ActivityIndicator,
  Avatar,
  Caption,
  Divider,
  Headline,
  List,
  Paragraph,
  Title,
  useTheme,
} from "react-native-paper";
import { SliderBox } from "react-native-image-slider-box";

import PetConnectApi from "../apis/PetConnectApi";
import AppScreen from "../components/common/AppScreen";
import LoadingScreen from "./LoadingScreen";
import { getInitials } from "../utils";

const ListingDetail = () => {
  const [loading, setLoading] = useState(true);
  const [listing, setListing] = useState(null);

  const { colors } = useTheme();

  const { params } = useRoute();

  useEffect(() => {
    PetConnectApi.get(`/listings/${params.id}`).then((res) => {
      setListing(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AppScreen>
      <SliderBox
        images={[...listing.images.map((i) => i.url)]}
        imageLoadingColor={colors.primary}
      />
      <ScrollView>
        <List.Section>
          <List.Subheader>Listing</List.Subheader>
          <List.Item
            title="Name"
            description={listing.name}
            left={(props) => (
              <List.Icon {...props} icon="information-variant" />
            )}
          />
          <List.Item
            title="Address"
            description={
              listing.address.address1
                ? `${listing.address.address1} · ${
                    listing.address.address2 ?? "?"
                  } · ${listing.address.district} · ${listing.address.city}`
                : "No address provided"
            }
            left={(props) => <List.Icon {...props} icon="map-marker" />}
          />
          <List.Item
            title="Price"
            description={listing.price ? `${listing.price}$` : "FREE"}
            left={(props) => <List.Icon {...props} icon="currency-usd" />}
          />
          <List.Item
            title="Description"
            description={listing.description}
            left={(props) => <List.Icon {...props} icon="text" />}
            descriptionNumberOfLines={50}
          />
          <List.Subheader>User</List.Subheader>
          <List.Item
            title="Posted by"
            description={listing.user.username}
            left={(props) =>
              listing.user.image ? (
                <Avatar.Image
                  {...props}
                  source={{ uri: listing.user.image }}
                  size={40}
                />
              ) : (
                <Avatar.Text
                  {...props}
                  label={getInitials(listing.user.username)}
                  size={40}
                />
              )
            }
          />
          <List.Item
            title="Email"
            description={listing.user.email}
            left={(props) => <List.Icon {...props} icon="email" />}
          />
          <List.Item
            title="Phone"
            description={listing.user.phone ?? "No phone provided"}
            left={(props) => <List.Icon {...props} icon="phone" />}
          />
          {listing.user.address.address1 ? (
            <>
              <List.Item
                title="Address"
                description={`${listing.user.address.address1} · ${
                  listing.user.address.address2 ?? "?"
                } · ${listing.user.address.district} · ${
                  listing.user.address.city
                }`}
                left={(props) => <List.Icon {...props} icon="map-marker" />}
              />
            </>
          ) : (
            <List.Item
              title="Address"
              description={"No address provided"}
              left={(props) => <List.Icon {...props} icon="map-marker" />}
            />
          )}
        </List.Section>
      </ScrollView>
    </AppScreen>
  );
};

export default ListingDetail;
