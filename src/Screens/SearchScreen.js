import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import MovieItem from "../Components/MovieItem";
import Header from "../Components/Header";

export default function SearchScreen({ route }) {
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = route.params;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=61accf04d2e2a5f2c66ca2088b94a404&query=${searchInput}&language=fr-FR`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data.results))
      .catch((error) =>
        console.error("Erreur de récupération de la recherche", error)
      );
  }, [searchInput]);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        style={styles.searchList}
        ListHeaderComponent={
          <Text style={styles.message}>
            Résultats de la recherche pour "{searchInput}"
          </Text>
        }
        contentContainerStyle={styles.flatListContent}
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem item={item} />}
        numColumns={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingBottom: 50,
    backgroundColor: "rgba(30, 30, 30, 1)",
  },
  message: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  searchList: {
    width: "100%",
    color: "rgba(255, 255, 255, 1)",
  },
  flatListContent: {
    alignItems: "center",
  },
});
