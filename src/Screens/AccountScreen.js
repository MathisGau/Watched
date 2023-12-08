import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import getFromStorage from "../Components/Storage/getFromStorage";

export default function AccountScreen() {
  const [likedMovies, setLikedMovies] = useState([]);
  const [watchLaterMovies, setWatchLaterMovies] = useState([]);
  const isFocused = useIsFocused();

  const navigation = useNavigation();

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
  }, [isFocused]);

  const navigateToDetails = async (item) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${item.id}?api_key=61accf04d2e2a5f2c66ca2088b94a404&language=fr-FR`
      );

      if (response.ok) {
        const movieDetails = await response.json();
        navigation.navigate("DetailScreen", { movieDetails });
      } else {
        try {
          const tvResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${item.id}?api_key=61accf04d2e2a5f2c66ca2088b94a404&language=fr-FR`
          );

          if (tvResponse.ok) {
            const tvDetails = await tvResponse.json();
            navigation.navigate("DetailScreen", { movieDetails: tvDetails });
          } else {
            console.error("Aucun détail trouvé pour le film ou la série.");
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des détails de la série TV:",
            error
          );
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des détails du film:",
        error
      );
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.separator} />
      <Text style={styles.title}>Favoris</Text>
      <View style={styles.container}>
        {likedMovies.length > 0 ? (
          <FlatList
            style={styles.registerContainer}
            data={likedMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.movieContainer}
                onPress={() => navigateToDetails(item)}
              >
                <Image
                  style={styles.movieImage}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                  }}
                />
                <View style={styles.movieTextContainer}>
                  <Text style={styles.movieTitle}>{item.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.text}>Aucun film liké pour le moment.</Text>
        )}
      </View>
      <Text style={styles.title}>A regarder plus tard</Text>
      <View style={styles.container}>
        {watchLaterMovies.length > 0 ? (
          <FlatList
            style={styles.registerContainer}
            data={watchLaterMovies}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.movieContainer}
                onPress={() => navigateToDetails(item)}
              >
                <Image
                  style={styles.movieImage}
                  source={{
                    uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
                  }}
                />
                <View style={styles.movieTextContainer}>
                  <Text style={styles.movieTitle}>
                    {item.title || item.original_name}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <Text style={styles.text}>
            Aucun film à regarder plus tard pour le moment.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "rgba(30, 30, 30, 1)",
    alignItems: "center",
    justifyContent: "center",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(225, 205, 0, 1)",
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  registerContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
  },
  movieTitle: {
    color: "white",
    fontSize: 16,
    marginVertical: 5,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  movieContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  movieImage: {
    width: 150,
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  movieTextContainer: {
    backgroundColor: "rgba(225, 205, 0, 1)",
    width: "100%",
    maxWidth: 150,
    paddingVertical: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },
  text: {
    color: "white",
  },
});
