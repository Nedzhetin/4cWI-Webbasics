const API_KEY: string = "0e30dbec457cd4089ed23d02506c2c55" + "";
const BASE_URL: string = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`, // encodeURIComponent to handle special characters in the query
  );
  const data = await response.json();
  return data.results;
};
