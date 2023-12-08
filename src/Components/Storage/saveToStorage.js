import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default saveToStorage;
