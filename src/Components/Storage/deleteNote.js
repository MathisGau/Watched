import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "notes";

export const deleteNote = async (noteIndex) => {
  try {
    const existingNotes = await AsyncStorage.getItem(STORAGE_KEY);
    if (existingNotes) {
      const notes = JSON.parse(existingNotes);
      notes.splice(noteIndex, 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la note:", error);
  }
};
