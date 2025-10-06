import { useMovieContext } from "../context/MovieContext.tsx";
import MovieCard from "../components/MovieCard.tsx";

function Favorites() {
  // @ts-ignore
  const { favorites } = useMovieContext();

  return (
    <div>
      {favorites.length == 0 ? (
        <h2 className="pt-20 text-center text-white">
          No favorite movies yet.
        </h2>
      ) : (
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-4 ">
          {favorites.map((favMovie: any) => (
            <MovieCard movie={favMovie} key={favMovie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
