import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

const api_key = "61accf04d2e2a5f2c66ca2088b94a404";
const link = "https://api.themoviedb.org/3";

export default DetailScreen = ({ route }) => {
  const { movieDetails } = route.params;

  return (
    <ScrollView style={styles.container}>
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
      </View>
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
});
