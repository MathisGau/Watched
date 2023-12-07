import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MovieItem from "../Components/MovieItem";
import fetchData, { search } from "../Services/CallAPI";
import Header from "../Components/Header";

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
    fetchData("movie/popular")
      .then((data) => setPopularMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films populaires", error)
      );
    fetchData("movie/upcoming")
      .then((data) => setUpcomingMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films à venir", error)
      );
    fetchData("movie/top_rated")
      .then((data) => setTopRatedMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films les mieux notés", error)
      );
    fetchData("movie/now_playing")
      .then((data) => setActualMovies(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films les mieux notés", error)
      );
    fetchData("tv/airing_today")
      .then((data) => setAiringTodaySeries(data.results))
      .catch((error) =>
        console.error(
          "Erreur de récupération des séries TV diffusées Aujourd'hui",
          error
        )
      );
    fetchData("tv/on_the_air")
      .then((data) => setOnTheAirSeries(data.results))
      .catch((error) =>
        console.error(
          "Erreur de récupération des séries TV en cours de diffusion",
          error
        )
      );
    fetchData("tv/popular")
      .then((data) => setPopularSeries(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des séries TV populaires", error)
      );
    fetchData("tv/top_rated")
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
      <Header />
      <ScrollView>
        <Text style={styles.title}>Actuellement au cinéma</Text>
        <FlatList
          style={styles.movieContainer}
          data={actualMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>Films Populaires</Text>
        <FlatList
          style={styles.movieContainer}
          data={popularMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>Films à Venir</Text>
        <FlatList
          style={styles.movieContainer}
          data={upcomingMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>Les mieux notés</Text>
        <FlatList
          style={styles.movieContainer}
          data={topRatedMovies}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>Diffusés Aujourd'hui</Text>
        <FlatList
          style={styles.serieContainer}
          data={airingTodaySeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>En cours de diffusion</Text>
        <FlatList
          style={styles.serieContainer}
          data={onTheAirSeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>Séries Populaires</Text>
        <FlatList
          style={styles.serieContainer}
          data={popularSeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
        <Text style={styles.title}>Séries les mieux notées</Text>
        <FlatList
          style={styles.serieContainer}
          data={topRatedSeries}
          horizontal={true}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieItem item={item} />}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "rgba(30, 30, 30, 1)",
  },
  title: {
    alignSelf: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "rgba(1255, 1255, 1255, 1)",
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
});
