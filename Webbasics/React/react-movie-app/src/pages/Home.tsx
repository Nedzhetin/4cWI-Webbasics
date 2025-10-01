import MovieCard from "../components/MovieCard.tsx";
import { useState } from "react";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const movies = [
    { id: 1, title: "Inception", release_date: "2020" },
    { id: 2, title: "John Wick", release_date: "2021" },
    { id: 3, title: "The Dark Knight", release_date: "2008" },
    { id: 4, title: "Interstellar", release_date: "2014" },
    { id: 5, title: "The Matrix", release_date: "1999" },
    { id: 6, title: "Pulp Fiction", release_date: "1994" },
    { id: 7, title: "Fight Club", release_date: "1999" },
    { id: 8, title: "Forrest Gump", release_date: "1994" },
    { id: 9, title: "The Shawshank Redemption", release_date: "1994" },
    { id: 10, title: "The Godfather", release_date: "1972" },
  ];

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    {
      /*prevent from reloading the page*/
    }
    alert(`Searching for: ${searchQuery}`);
    setSearchQuery("");
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="fixed h-20 w-80 right-1/2 transform translate-x-1/2 top-4 flex items-center justify-center"
      >
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 rounded-lg p-2"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
        >
          Search
        </button>
      </form>

      <div className="mt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {movies.map(
          (movie) =>
            movie.title.toLowerCase().startsWith(searchQuery.toLowerCase()) && (
              <MovieCard movie={movie} key={movie.id} />
            ),
        )}
      </div>
    </div>
  );
}

export default Home;
