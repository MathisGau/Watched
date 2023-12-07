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
  const [newOverview, setNewOverview] = useState(null);

  useEffect(() => {
    CallAPI.fetchMovieRecommendations(movieDetails.id)
      .then((data) => {
        if (data && data.results) {
          setRecommendations(data.results);
        } else {
          console.log("Aucune recommandation disponible pour ce film/épisode.");
        }
      })
      .catch((error) =>
        console.log("Erreur de récupération des films populaires", error)
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

    const fetchNewOverview = async () => {
      if (movieDetails.overview == "") {
        try {
          const enResponse = await fetch(
            `https://api.themoviedb.org/3/tv/${movieDetails.id}?api_key=61accf04d2e2a5f2c66ca2088b94a404`
          );
          const enData = await enResponse.json();
          if (enData && enData.overview) {
            setNewOverview(enData.overview);
          } else {
            console.log(
              "Aucune description en anglais disponible pour cette série."
            );
          }
        } catch (error) {
          console.log(
            "Erreur de récupération de la description en enançais",
            error
          );
        }
      }
    };
    fetchNewOverview();
  }, []);

  const renderReleaseDate = () => {
    if (movieDetails.release_date && movieDetails.release_date !== "") {
      return (
        <Text style={styles.releaseDate}>
          Date de sortie : {movieDetails.release_date}
        </Text>
      );
    }
    return null;
  };

  const renderOverview = () => {
    const overview = movieDetails.overview;
    if (overview && overview !== "") {
      return (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{overview}</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{newOverview}</Text>
        </View>
      );
    }
  };

  const renderTitle = () => {
    return (
      <Text style={styles.title}>
        {movieDetails.original_name || movieDetails.title}
      </Text>
    );
  };

  const saveToStorage = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
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
        {renderTitle()}
        {renderReleaseDate()}
        {renderOverview()}
        {recommendations && recommendations.length > 0 && (
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
    height: 500,
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
