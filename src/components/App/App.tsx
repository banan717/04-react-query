import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import css from './App.module.css';

import { fetchMovies, MoviesResponse } from '../../services/movieService';
import { Movie } from '../../types/movie';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

import { useQuery } from '@tanstack/react-query';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  // Використовуємо useQuery для запиту даних
  const { data, isLoading, isError, isFetching } = useQuery(
    ['movies', query, page],
    () => fetchMovies(query, page),
    {
      keepPreviousData: true,
      enabled: !!query, // запит виконується лише якщо є query
    }
  );

  // Toast для "No movies found"
  useEffect(() => {
    if (data && data.results.length === 0) {
      toast.error('No movies found for your request.');
    }
  }, [data]);

  // Новий пошук скидає сторінку
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  // Зміна сторінки
  const handlePageChange = (selectedItem: { selected: number }) => {
    setPage(selectedItem.selected + 1); // ReactPaginate сторінки 0-indexed
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      <Toaster />

      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <>
          <MovieGrid movies={data.results} onSelect={setSelectedMovie} />

          {data.total_pages > 1 && (
            <ReactPaginate
              previousLabel={'← Previous'}
              nextLabel={'Next →'}
              pageCount={data.total_pages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={css.pagination}
              activeClassName={css.activePage}
              forcePage={page - 1} // синхронізація з state
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {isFetching && !isLoading && <Loader />}
    </div>
  );
}
