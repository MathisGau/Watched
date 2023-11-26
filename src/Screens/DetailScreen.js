import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import MovieItem from "../Components/MovieItem";
import * as CallAPI from "../Services/CallAPI";
import Header from "../Components/Header";

export default DetailScreen = ({ route }) => {
  const { movieDetails } = route.params;
  const navigation = useNavigation();

  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    CallAPI.fetchMovieRecommendations(movieDetails.id)
      .then((data) => setRecommendations(data.results))
      .catch((error) =>
        console.error("Erreur de récupération des films populaires", error)
      );
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Header></Header>
      <Image
        style={styles.path}
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.releaseDate}>
          Date de sortie : {movieDetails.release_date}
        </Text>
        <Text style={styles.description}>Description :</Text>
        <Text style={styles.description}>{movieDetails.overview}</Text>
        <Text style={styles.note}>
          Note : {movieDetails.vote_average.toFixed(1)}/10
        </Text>
        <Text style={styles.title}>Recommendations</Text>
      </View>
      <FlatList
        style={styles.recommendationsContainer}
        data={recommendations}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <MovieItem item={item} navigation={navigation} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(190, 190, 190, 1)",
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
    fontSize: 26,
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
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "white",
  },
  note: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  recommendationsContainer: {
    marginHorizontal: 5,
    marginBottom: 30,
  },
});
