import { useNavigation } from "@react-navigation/core";
import { formatDistance, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { Text, FAB, useTheme, Card } from "react-native-paper";
import PetConnectApi from "../../apis/PetConnectApi";
import AppScreen from "../../components/common/AppScreen";
import LoadingScreen from "../LoadingScreen";

const Listings = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchListings = (refresh = false) => {
    if (refresh) setRefreshing(true);
    PetConnectApi.get("/user/listings").then((res) => {
      setListings(res.data.listings);
      setLoading(false);
      if (refresh) setRefreshing(false);
    });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <AppScreen>
      <FAB
        style={[styles.fab, { backgroundColor: colors.primary, zIndex: 10 }]}
        icon="plus"
        onPress={() => navigation.navigate("AddListing")}
      />
      <FlatList
        data={listings}
        contentContainerStyle={{ padding: 15 }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchListings(true)}
            colors={[colors.primary]}
          />
        }
        renderItem={({ item }) => {
          const diff = formatDistance(parseISO(item.created_at), new Date(), {
            addSuffix: true,
          });
          return (
            <Card
              key={item.id}
              style={{ marginBottom: 15 }}
              onPress={() =>
                navigation.navigate("EditListing", { listing: item })
              }
            >
              <Card.Cover source={{ uri: item.images[0].url }} />
              <Card.Title title={item.name} subtitle={`Posted ${diff}`} />
            </Card>
          );
        }}
      />
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    right: 16,
    bottom: 46,
  },
});

export default Listings;
