import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "notes";

export const getNotes = async () => {
  try {
    const existingNotes = await AsyncStorage.getItem(STORAGE_KEY);
    return existingNotes ? JSON.parse(existingNotes) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des notes:", error);
    return [];
  }
};
