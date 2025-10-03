import MovieCard from "../components/MovieCard.tsx";
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "../services/api.ts";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch popular movies.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); /*prevent from reloading the page*/
    if (!searchQuery.trim()) return; /*if searchQuery is empty, do nothing*/
    if (loading) return; /*if already loading, do nothing*/
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
    } catch (err) {
      console.error(err);
      setError("Failed to search movies.");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  return (
    <div className={"pt-16"}>
      <form
        onSubmit={handleSearch}
        className=" h-28 w-screen top-4 flex items-center justify-center "
      >
        <input
          type="text"
          placeholder="Search"
          className=" border rounded-lg w-1/3 h-2/4 p-2 bg-gray-500 text-white placeholder:text-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 p-2 h-1/2 w-28 bg-gray-800 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div className="w-screen h-screen flex justify-center items-center align-text-center text-6xl">
          <h2>loading...</h2>
        </div>
      ) : (
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 p-4 ">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}
    </div>
  );
}

/* {movies.map(
        (movie) =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) && (
            <MovieCard movie={movie} key={movie.id} />
          ),
      )} */

export default Home;
