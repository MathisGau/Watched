import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "notes";

export const saveNote = async (note) => {
  try {
    const existingNotes = await AsyncStorage.getItem(STORAGE_KEY);
    const notes = existingNotes ? JSON.parse(existingNotes) : [];
    notes.push(note);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la note:", error);
  }
};
