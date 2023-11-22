import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

const api_key = "61accf04d2e2a5f2c66ca2088b94a404";
const link = "https://api.themoviedb.org/3";

const MovieItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() =>
        navigation.navigate("DetailScreen", { movieDetails: item })
      }
    >
      <Image
        style={styles.poster_path}
        source={{ uri: `https://image.tmdb.org/t/p/w200${item.poster_path}` }}
      />
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  const navigation = useNavigation();

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actualMovies, setActualMovies] = useState([]);

  const [airingTodaySeries, setAiringTodaySeries] = useState([]);
  const [onTheAirSeries, setOnTheAirSeries] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);

  useEffect(() => {
    fetch(`${link}/movie/popular?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films populaires", error)
      );

    fetch(`${link}/movie/upcoming?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setUpcomingMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films à venir", error)
      );

    fetch(`${link}/movie/top_rated?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setTopRatedMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films les mieux notés", error)
      );
    fetch(`${link}/movie/now_playing?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setActualMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films les mieux notés", error)
      );
    fetch(`${link}/tv/airing_today?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setAiringTodaySeries(data.results))
      .catch((error) =>
        console.error(
          "Erreur de récupération des séries TV diffusées Aujourd'hui",
          error
        )
      );
    fetch(`${link}/tv/on_the_air?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setOnTheAirSeries(data.results))
      .catch((error) =>
        console.error(
          "Erreur de récupération des séries TV en cours de diffusion",
          error
        )
      );
    fetch(`${link}/tv/popular?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setPopularSeries(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des séries TV populaires", error)
      );
    fetch(`${link}/tv/top_rated?api_key=${api_key}&language=fr-FR`)
      .then((response) => response.json())
      .then((data) => setTopRatedSeries(data.results))
      .catch((error) =>
        console.error(
          "Erreur de récupération des séries TV les mieux notées",
          error
        )
      );
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.searchBarre}>
        <TextInput style={styles.searchInput} placeholder="Rechercher" />
        <View style={styles.searchSeparator}></View>
        <TouchableOpacity style={styles.searchButton}>
          <View>
            <Icon name="search" style={styles.searchIcon} />
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Text style={styles.title}>Actuellement au cinéma</Text>
        <FlatList
          style={styles.movieContainer}
          data={actualMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>Films Populaires</Text>
        <FlatList
          style={styles.movieContainer}
          data={popularMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>Films à Venir</Text>
        <FlatList
          style={styles.movieContainer}
          data={upcomingMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>Les mieux notés</Text>
        <FlatList
          style={styles.movieContainer}
          data={topRatedMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>Diffusés Aujourd'hui</Text>
        <FlatList
          style={styles.serieContainer}
          data={airingTodaySeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>En cours de diffusion</Text>
        <FlatList
          style={styles.serieContainer}
          data={onTheAirSeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>Séries Populaires</Text>
        <FlatList
          style={styles.serieContainer}
          data={popularSeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
        <Text style={styles.title}>Séries les mieux notées</Text>
        <FlatList
          style={styles.serieContainer}
          data={topRatedSeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <MovieItem item={item} navigation={navigation} />
          )}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(190, 190, 190, 1)",
  },
  searchBarre: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(230, 230, 230, 1)",
    width: "90%",
    marginVertical: 10,
    borderRadius: 15,
    color: "rgba(255, 255, 255, 1)",
  },
  searchInput: {
    flex: 14,
    borderWidth: 0,
    padding: 15,
    color: "rgba(255, 255, 255, 1)",
  },
  searchSeparator: {
    flex: 0.1,
    height: "70%",
    backgroundColor: "rgba(190, 190, 190, 1)",
  },
  searchButton: {
    flex: 1,
    height: "100%",
    padding: 15,
  },
  searchIcon: {
    alignSelf: "center",
    fontSize: 18,
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 20,
    marginBottom: 20,
  },
  movieContainer: {
    marginHorizontal: 5,
    marginBottom: 15,
  },
  serieContainer: {
    marginHorizontal: 5,
    marginBottom: 15,
  },
  movieTitle: {
    maxWidth: 120,
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "rgba(255, 255, 255, 1)",
  },
  poster_path: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
});
