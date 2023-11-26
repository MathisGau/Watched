const api_key = "61accf04d2e2a5f2c66ca2088b94a404";
const link = "https://api.themoviedb.org/3";

export const fetchMovieRecommendations = async (movieId) => {
  const endpoint = `movie/${movieId}/recommendations`;
  return fetchData(endpoint);
};

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(
      `${link}/${endpoint}?api_key=${api_key}&language=fr-FR`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des données", error);
    throw error;
  }
};

export default fetchData;

// const api_key = "61accf04d2e2a5f2c66ca2088b94a404";
// const link = "https://api.themoviedb.org/3";

// fetch(`${link}/movie/popular?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setPopularMovies(data.results))
//   .catch((error) =>
//     console.error("Erreur de récupération des films populaires", error)
//   );
// fetch(`${link}/movie/upcoming?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setUpcomingMovies(data.results))
//   .catch((error) =>
//     console.error("Erreur de récupération des films à venir", error)
//   );
// fetch(`${link}/movie/top_rated?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setTopRatedMovies(data.results))
//   .catch((error) =>
//     console.error("Erreur de récupération des films les mieux notés", error)
//   );
// fetch(`${link}/movie/now_playing?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setActualMovies(data.results))
//   .catch((error) =>
//     console.error("Erreur de récupération des films les mieux notés", error)
//   );
// fetch(`${link}/tv/airing_today?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setAiringTodaySeries(data.results))
//   .catch((error) =>
//     console.error(
//       "Erreur de récupération des séries TV diffusées Aujourd'hui",
//       error
//     )
//   );
// fetch(`${link}/tv/on_the_air?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setOnTheAirSeries(data.results))
//   .catch((error) =>
//     console.error(
//       "Erreur de récupération des séries TV en cours de diffusion",
//       error
//     )
//   );

// fetch(`${link}/tv/popular?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setPopularSeries(data.results))
//   .catch((error) =>
//     console.error("Erreur de récupération des séries TV populaires", error)
//   );

// fetch(`${link}/tv/top_rated?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setTopRatedSeries(data.results))
//   .catch((error) =>
//     console.error(
//       "Erreur de récupération des séries TV les mieux notées",
//       error
//     )
//   );

// fetch(`${link}/movie/${movieDetailsId}/recommendations?api_key=${api_key}&language=fr-FR`)
//   .then((response) => response.json())
//   .then((data) => setPopularSeries(data.results))
//   .catch((error) =>
//     console.error("Erreur de récupération des séries TV populaires", error)
//   );
