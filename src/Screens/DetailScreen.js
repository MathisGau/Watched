import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import MovieItem from "../Components/MovieItem";
import * as CallAPI from "../Services/CallAPI";
import Icon from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default DetailScreen = ({ route }) => {
  const { movieDetails } = route.params;
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaveToWatchLatered, setIsSaveToWatchLatered] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    CallAPI.fetchMovieRecommendations(movieDetails.id)
      .then((data) => setRecommendations(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films populaires", error)
      );
    const fetchSavedData = async () => {
      const savedIsLiked = await getFromStorage(`isLiked_${movieDetails.id}`);
      const savedIsSaveToWatchLatered = await getFromStorage(
        `isSaveToWatchLatered_${movieDetails.id}`
      );

      if (savedIsLiked !== null) {
        setIsLiked(savedIsLiked);
      }

      if (savedIsSaveToWatchLatered !== null) {
        setIsSaveToWatchLatered(savedIsSaveToWatchLatered);
      }
    };

    fetchSavedData();
  }, []);

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
      console.log(`Données enregistrées avec succès pour la clé ${key}`);
    } catch (error) {
      console.error(
        `Erreur lors de l'enregistrement des données pour la clé ${key}:`,
        error
      );
    }
  };

  const getFromStorage = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération des données pour la clé ${key}:`,
        error
      );
      return null;
    }
  };

  const handleLikePress = async () => {
    const updatedIsLiked = !isLiked;
    await saveToStorage(`isLiked_${movieDetails.id}`, updatedIsLiked);
    setIsLiked(updatedIsLiked);

    const allLikedMovies = (await getFromStorage("likedMovies")) || [];
    const movieIndex = allLikedMovies.findIndex(
      (movie) => movie.id === movieDetails.id
    );
    if (updatedIsLiked && movieIndex === -1) {
      const updatedLikedMovies = [...allLikedMovies, movieDetails];
      await saveToStorage("likedMovies", updatedLikedMovies);
    } else if (!updatedIsLiked && movieIndex !== -1) {
      allLikedMovies.splice(movieIndex, 1);
      await saveToStorage("likedMovies", allLikedMovies);
    }
  };

  const handleSaveToWatchLaterPress = async () => {
    const updatedIsSaveToWatchLatered = !isSaveToWatchLatered;
    await saveToStorage(
      `isSaveToWatchLatered_${movieDetails.id}`,
      updatedIsSaveToWatchLatered
    );
    setIsSaveToWatchLatered(updatedIsSaveToWatchLatered);

    const allWatchLaterMovies =
      (await getFromStorage("watchLaterMovies")) || [];
    const movieIndex = allWatchLaterMovies.findIndex(
      (movie) => movie.id === movieDetails.id
    );
    if (updatedIsSaveToWatchLatered && movieIndex === -1) {
      const updatedSaveToWatchLater = [...allWatchLaterMovies, movieDetails];
      await saveToStorage("watchLaterMovies", updatedSaveToWatchLater);
    } else if (!updatedIsSaveToWatchLatered && movieIndex !== -1) {
      allWatchLaterMovies.splice(movieIndex, 1);
      await saveToStorage("watchLaterMovies", allWatchLaterMovies);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.path}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }}
      />
      <View style={styles.contentContainer}>
        <View style={styles.headerContent}>
          <View style={styles.noteContainer}>
            <Text style={styles.note}>
              {movieDetails.vote_average.toFixed(1)}/10
            </Text>
          </View>
          <View style={styles.headerRightContainer}>
            <TouchableOpacity onPress={handleLikePress}>
              <Icon name="heart" size={30} color={isLiked ? "red" : "white"} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSaveToWatchLaterPress}>
              <Icon
                name="clockcircleo"
                size={30}
                color={isSaveToWatchLatered ? "yellow" : "white"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.separator} />
        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.releaseDate}>
          Date de sortie : {movieDetails.release_date}
        </Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{movieDetails.overview}</Text>
        </View>
        {recommendations.length > 0 && (
          <>
            <Text style={styles.titleRecommendations}>Recommendations</Text>
            <FlatList
              style={styles.recommendationsContainer}
              data={recommendations}
              horizontal={true}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <MovieItem item={item} navigation={navigation} />
              )}
            />
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(30, 30, 30, 1)",
  },
  path: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
    gap: 15,
  },
  title: {
    fontSize: 42,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  titleRecommendations: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 5,
  },
  releaseDate: {
    fontSize: 16,
    color: "grey",
    marginBottom: 10,
  },
  descriptionContainer: {
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "rgba(165, 165, 165, 0.2)",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
    padding: 10,
  },
  headerRightContainer: {
    flexDirection: "row",
    gap: 15,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noteContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "rgba(225, 205, 0, 1)",
    justifyContent: "center",
    alignItems: "center",
  },
  note: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  separator: {
    height: 1,
    backgroundColor: "rgba(225, 205, 0, 1)",
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
  },
  recommendationsContainer: {
    marginHorizontal: 5,
    marginBottom: 30,
  },
});
