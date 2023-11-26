import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import fetchData from "../Services/CallAPI";
import MovieItem from "../Components/MovieItem";
import Header from "../Components/Header";

export default function SearchScreen({ route }) {
  const [searchResults, setSearchResults] = useState([]);
  const searchInput = route.params;

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=61accf04d2e2a5f2c66ca2088b94a404&query=${searchInput}`
    );
  }, []);

  return (
    <View>
      <Header />
      <Text>Résultats de la recherche pour "{searchInput}"</Text>
      <FlatList
        data={searchResults}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem item={item} />}
      />
    </View>
  );
}
