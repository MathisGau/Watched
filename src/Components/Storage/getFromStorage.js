import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default getFromStorage;
