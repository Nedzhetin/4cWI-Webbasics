import { useMovieContext } from "../context/MovieContext.tsx";
import Popup from "./Popup.tsx";
import { useState } from "react";

function MovieCard({ movie }: { movie: any }) {
  // @ts-ignore
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  function onFavoriteClick() {
    if (isFavorite(movie.id)) {
      removeFromFavorites(movie.id);
      setPopupMessage(`${movie.title} removed from favorites`);
    } else {
      addToFavorites(movie);
      setPopupMessage(`${movie.title} added to favorites`);
    }
  }

  return (
    <div className="relative text-white w-8/10 h-9/10 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <button
        className={`absolute top-2 right-2 text-3xl transition-colors ${
          isFavorite(movie.id)
            ? "text-red-500"
            : "text-gray-300 hover:text-red-500"
        }`}
        onClick={() => onFavoriteClick()}
      >
        ♥
      </button>
      <div className="absolute w-full bottom-0 h-20 bg-gray-800">
        <h3 className="text-xl">{movie.title}</h3>
        <p className="absolute bottom-0">
          {movie.release_date?.replaceAll("-", ".")}
        </p>
      </div>
      {popupMessage && (
        <Popup
          key={popupMessage + movie.id} // force re-mount on message change
          message={popupMessage}
          movieID={movie.id}
        />
      )}
    </div>
  );
}

export default MovieCard;
