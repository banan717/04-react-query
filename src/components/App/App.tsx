import { useState } from "react";
import { fetchMovies } from "./services/movieService";
import { Movie } from "./types/movie";
import SearchBar from "./components/SearchBar/SearchBar.tsx";
import MovieGrid from "./components/MovieGrid/MovieGrid.tsx";
import Loader from "./components/Loader/Loader.tsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.tsx";
import MovieModal from "./components/MovieModal/MovieModal.tsx";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(false);
      setMovies([]);

      const data = await fetchMovies(query);

      if (data.length === 0) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {loading && <Loader />}
      {error && <ErrorMessage />}
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
