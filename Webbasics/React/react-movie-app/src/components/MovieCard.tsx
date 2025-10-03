function MovieCard({ movie }: { movie: any }) {
  function onFavoriteClick() {
    alert("Favorite!");
  }

  return (
    <div className="relative text-white w-8/10 h-9/10 border border-gray-300 rounded-lg overflow-hidden shadow-lg">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <button
        className="absolute top-2 right-2 text-3xl hover:text-red-500"
        onClick={() => onFavoriteClick()}
      >
        ♥
      </button>
      <div className="absolute w-full bottom-0 h-20 bg-gray-800">
        <h3>{movie.title}</h3>
        <p className="absolute bottom-0">
          {movie.release_date?.replaceAll("-", ".")}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;
