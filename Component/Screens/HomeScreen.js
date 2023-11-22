import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TextInput style={styles.searchInput} placeholder="Rechercher" />
      <ScrollView style={styles.scrollView}></ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  searchInput: {
    width: "100%",
    borderWidth: 0,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 15,
  },
  scrollView: {
    width: "100%",
  },
});
