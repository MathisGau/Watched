import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";

export default Header = () => {
  const navigation = useNavigation();

  const [searchInput, setSearchInput] = useState("");

  const searchMulti = async () => {
    try {
      navigation.navigate("SearchScreen", searchInput);
    } catch (error) {
      console.error("Erreur lors de la recherche", error);
    }
  };

  const returnHome = () => {
    navigation.navigate("Home", { searchInput: "" });
  };

  return (
    <View style={styles.header}>
      <View style={styles.searchBarre}>
        <TouchableOpacity style={styles.searchButton} onPress={returnHome}>
          <Icon name="home" style={styles.Icon} />
        </TouchableOpacity>
        <View style={styles.searchSeparator}></View>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher"
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <View style={styles.searchSeparator}></View>
        <TouchableOpacity style={styles.searchButton} onPress={searchMulti}>
          <Icon name="search" style={styles.Icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  searchBarre: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(230, 230, 230, 1)",
    width: "90%",
    marginVertical: 10,
    borderRadius: 15,
    color: "rgba(255, 255, 255, 1)",
  },
  searchInput: {
    flex: 10,
    borderWidth: 0,
    color: "black",
    fontSize: 14,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  searchSeparator: {
    flex: 0.05,
    height: "70%",
    backgroundColor: "rgba(190, 190, 190, 1)",
  },
  searchButton: {
    flex: 1,
    height: "auto",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  Icon: {
    alignSelf: "center",
    fontSize: 20,
  },
});
