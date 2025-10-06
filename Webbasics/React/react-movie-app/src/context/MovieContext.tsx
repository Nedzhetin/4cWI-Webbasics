import { createContext, useContext, useEffect, useState } from "react";

// @ts-ignore
const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }: { children: any }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: any) => {
    // @ts-ignore
    setFavorites((prevState) => [...prevState, movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    // @ts-ignore
    setFavorites((prevState) =>
      // @ts-ignore
      prevState.filter((movie) => movie.id !== movieId),
    );
  };

  const isFavorite = (movieId: number) => {
    // @ts-ignore
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
