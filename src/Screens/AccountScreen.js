import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AccountScreen() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);

  useEffect(() => {
    const fetchSavedData = async () => {
      const savedLikedMovies = await getFromStorage("likedMovies");
      const savedWatchLaterMovies = await getFromStorage("watchLaterMovies");

      if (savedLikedMovies !== null) {
        setLikedMovies(savedLikedMovies);
      }

      if (savedWatchLaterMovies !== null) {
        setWatchLaterMovies(savedWatchLaterMovies);
      }
    };

    fetchSavedData();
  }, []);

  const getFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : [];
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données pour la clé ${key}:`,
        error
      );
      return [];
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favoris :</Text>
      {likedMovies.length > 0 ? (
        <FlatList
          data={likedMovies}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.movieContainer}>
              <Image
                style={styles.movieImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                }}
              />
              {/* <View style={styles.movieTextContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
              </View> */}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Aucun film liké pour le moment.</Text>
      )}

      <Text style={styles.title}>A regarder plus tard :</Text>
      {watchLaterMovies.length > 0 ? (
        <FlatList
          data={watchLaterMovies}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.movieContainer}>
              <Image
                style={styles.movieImage}
                source={{
                  uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                }}
              />
              {/* <View style={styles.movieTextContainer}>
                <Text style={styles.movieTitle}>{item.title}</Text>
              </View> */}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>Aucun film à regarder plus tard pour le moment.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 30, 30, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 20,
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
  },
  movieContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
  },
  movieImage: {
    width: 150,
    height: 200,
    borderRadius: 5,
  },
  movieTextContainer: {
    backgroundColor: "rgba(225, 205, 0, 1)",
    width: "100%",
    paddingVertical: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
});
