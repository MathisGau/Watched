import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

export default MovieItem = ({ item }) => {
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

const styles = StyleSheet.create({
  movieContainer: {
    marginHorizontal: 5,
    marginBottom: 15,
  },
  poster_path: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
});
