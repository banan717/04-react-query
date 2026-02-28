// Loader.tsx
import css from './Loader.module.css';
export default function Loader() { return <div className={css.loader}>Loading...</div>; }

// ErrorMessage.tsx
import css from './ErrorMessage.module.css';
export default function ErrorMessage() { return <div className={css.error}>Something went wrong.</div>; }

// MovieGrid.tsx
import { Movie } from '../../types/movie';
import css from './MovieGrid.module.css';

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  return (
    <div className={css.grid}>
      {movies.map((movie) => (
        <div key={movie.id} onClick={() => onSelect(movie)} className={css.card}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </div>
      ))}
    </div>
  );
}
