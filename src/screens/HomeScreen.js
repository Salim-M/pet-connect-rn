import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, View } from "react-native";
import { Appbar, Card, Searchbar, useTheme } from "react-native-paper";

import LoadingScreen from "./LoadingScreen";

import PetConnectApi from "../apis/PetConnectApi";
import { useNavigation } from "@react-navigation/core";
import AppScreen from "../components/common/AppScreen";
import { formatDistance, parseISO } from "date-fns";

const HomeScreen = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const [query, setQuery] = useState("");

  const { colors } = useTheme();

  const navigation = useNavigation();

  const handleSearch = () => {
    if (query.length > 2) {
      PetConnectApi.get("/listings", {
        params: {
          q: query,
        },
      }).then((res) => setFiltered(res.data.data));
      return;
    }
    setFiltered([]);
  };

  const fetchListings = (refresh = false) => {
    if (refresh) {
      setRefreshing(true);
      setPage(1);
      setHasNext(false);
    }
    PetConnectApi.get("/listings").then((res) => {
      if (res.data.next_page_url !== null) {
        setHasNext(true);
        setPage(res.data.current_page + 1);
      }
      setListings(res.data.data);
      setLoading(false);
      if (refresh) setRefreshing(false);
    });
  };

  const infiniteScroll = () => {
    if (!hasNext) return;
    PetConnectApi.get("/listings", {
      params: {
        page,
      },
    }).then((res) => {
      setListings([...listings, ...res.data.data]);
      if (res.data.next_page_url !== null) {
        setHasNext(true);
        setPage(page + 1);
      } else {
        setHasNext(false);
      }
    });
  };

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [query, setQuery]);

  if (loading) return <LoadingScreen />;
  return (
    <AppScreen>
      <FlatList
        data={filtered.length > 0 ? filtered : listings}
        ListHeaderComponent={
          <Searchbar
            placeholder="Search"
            onChangeText={(t) => setQuery(t)}
            value={query}
          />
        }
        ListHeaderComponentStyle={{ marginBottom: 15 }}
        contentContainerStyle={{ padding: 15 }}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchListings(true)}
            colors={[colors.primary]}
          />
        }
        onEndReachedThreshold={0.5}
        onEndReached={() => infiniteScroll()}
        renderItem={({ item }) => {
          const diff = formatDistance(parseISO(item.created_at), new Date(), {
            addSuffix: true,
          });
          return (
            <Card
              key={item.id}
              style={{ marginBottom: 15 }}
              onPress={() =>
                navigation.navigate("ListingDetail", {
                  name: item.name,
                  id: item.id,
                })
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

export default HomeScreen;
