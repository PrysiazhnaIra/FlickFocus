import { useState, useEffect, useRef } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  useSearchParams,
} from "react-router-dom";
import { searchMovies } from "../../api/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";
import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const location = useLocation();

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          setLoading(true);
          const searchResult = await searchMovies(query, page);

          setMovies((prevMovies) => {
            if (page === 1) {
              return searchResult.results;
            } else {
              return [...prevMovies, ...searchResult.results];
            }
          });
          if (searchResult.results.length === 0) {
            setHasMore(false);
          }
          if (page === 1) {
            setInitialLoad(true);
          }
        } catch (error) {
          console.error("Error searching movies", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMovies();
    }
  }, [query, page]);

  const handleSearch = (value) => {
    setSearchParams({ query: value });
  };

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div>
      <SearchForm onSearch={handleSearch} initialQuery={query} />
      <MovieList movies={movies} />
      {loading && <Loader />}
      {initialLoad && hasMore && !loading && (
        <button onClick={handleLoadMore} className={css.loadMoreButton}>
          Load more
        </button>
      )}
    </div>
  );
}
