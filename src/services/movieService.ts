import axios from 'axios';
import { Movie } from '../types/movie';

interface MoviesResponse {
  results: Movie[];
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string
): Promise<Movie[]> => {
  const { data } = await axios.get<MoviesResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: { query },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
      },
    }
  );

  return data.results;
};
