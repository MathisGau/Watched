const api_key = "?api_key=61accf04d2e2a5f2c66ca2088b94a404";
const link = "https://api.themoviedb.org/3";

export const fetchMovieRecommendations = async (movieId) => {
  const endpoint = `movie/${movieId}/recommendations`;
  return fetchData(endpoint);
};

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(
      `${link}/${endpoint}${api_key}&language=fr-FR`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des données", error);
    throw error;
  }
};

//A utiliser pour les détails d'un film ou série
export const fetchDetails = async (movieId) => {
  try {
    const response = await fetch(
      `${link}/movie/${movieId}${api_key}&language=fr-FR`
    );
    if (response.ok) {
      const movieDetails = await response.json();
      return movieDetails;
    } else {
      try {
        const tvResponse = await fetch(
          `${link}/tv/${movieId}${api_key}&language=fr-FR`
        );
        if (tvResponse.ok) {
          const tvDetails = await tvResponse.json();
          return tvDetails;
        } else {
          console.error("Aucun détail trouvé pour le film ou la série.");
        }
      } catch (error) {
        console.error(
          "Erreur de récupération des détails de la série TV:",
          error
        );
      }
    }
  } catch (error) {
    console.error("Erreur de récupération des détails du film:", error);
  }
};

export default fetchData;
