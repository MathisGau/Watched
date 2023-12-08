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
import getFromStorage from "../Components/Storage/getFromStorage";
import saveToStorage from "../Components/Storage/saveToStorage";

export default DetailScreen = ({ route }) => {
  const { movieDetails } = route.params;
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaveToWatchLatered, setIsSaveToWatchLatered] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [newOverview, setNewOverview] = useState(null);
  const [genres, setGenres] = useState([]);

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
          console.log("Erreur de récupération de la description", error);
        }
      }
    };
    fetchNewOverview();
    // const fetchGenreIDs = async () => {
    //   try {
    //     const genreResponses = await Promise.all(
    //       movieDetails.genre_ids.map(async (genreId) => {
    //         const response = await fetch(
    //           `https://api.themoviedb.org/3/genre/${genreId}?api_key=61accf04d2e2a5f2c66ca2088b94a404&language=fr-FR`
    //         );
    //         return response.json();
    //       })
    //     );

    //     const genreNames = genreResponses.map((data) => data.name);
    //     setGenres(genreNames);
    //   } catch (error) {
    //     console.error("Erreur lors de la récupération des données", error);
    //   }
    // };
    // fetchGenreIDs();
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

  const handlePress = async (key, state, setState, storageKey) => {
    const updatedState = !state;
    await saveToStorage(`${key}_${movieDetails.id}`, updatedState);
    setState(updatedState);

    const allMovies = (await getFromStorage(storageKey)) || [];
    const movieIndex = allMovies.findIndex(
      (movie) => movie.id === movieDetails.id
    );

    if (updatedState && movieIndex === -1) {
      const updatedMovies = [...allMovies, movieDetails];
      await saveToStorage(storageKey, updatedMovies);
    } else if (!updatedState && movieIndex !== -1) {
      allMovies.splice(movieIndex, 1);
      await saveToStorage(storageKey, allMovies);
    }
  };

  const handleLikePress = async () => {
    await handlePress("isLiked", isLiked, setIsLiked, "likedMovies");
  };

  const handleSaveToWatchLaterPress = async () => {
    await handlePress(
      "isSaveToWatchLatered",
      isSaveToWatchLatered,
      setIsSaveToWatchLatered,
      "watchLaterMovies"
    );
  };

  const navigateToHome = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <>
      <TouchableOpacity style={styles.homeButton} onPress={navigateToHome}>
        <Icon name="arrowleft" size={30} color="rgba(225, 205, 0, 1)" />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <Image
          style={styles.path}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
        />
        {/* <View style={styles.genresContainer}>
          {genres.map((genre, index) => (
            <TouchableOpacity key={index} style={styles.genreButton}>
              <Text style={styles.genreText}>{genre}</Text>
            </TouchableOpacity>
          ))}
        </View> */}
        <View style={styles.contentContainer}>
          <View style={styles.headerContent}>
            <View style={styles.noteContainer}>
              <Text style={styles.note}>
                {movieDetails.vote_average.toFixed(1)}/10
              </Text>
            </View>
            <View style={styles.headerRightContainer}>
              <TouchableOpacity onPress={handleLikePress}>
                <Icon
                  name="heart"
                  size={30}
                  color={isLiked ? "red" : "white"}
                />
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
    </>
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
    marginHorizontal: 0,
    marginBottom: 30,
  },
  homeButton: {
    position: "absolute",
    padding: 5,
    borderWidth: 2,
    backgroundColor: "rgba(225, 200, 0, 0.2)",
    borderColor: "rgba(225, 205, 0, 1)",
    borderRadius: 50,
    top: 60,
    left: 20,
    zIndex: 1,
  },
  genresContainer: {
    position: "absolute",
    gap: 15,
    top: 60,
    right: 15,
    backgroundColor: "rgba(255, 255, 255, 0)",
    flexDirection: "column",
    alignContent: "center",
    zIndex: 1,
  },
  genreButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  genreText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
});
