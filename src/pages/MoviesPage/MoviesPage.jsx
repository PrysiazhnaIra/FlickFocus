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
// import css from "./MoviesPage.module.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const location = useLocation();
  console.log(location);

  useEffect(() => {
    if (query) {
      const fetchMovies = async () => {
        try {
          const searchResult = await searchMovies(query);
          setMovies(searchResult.results);
        } catch (error) {
          console.error("Error searching movies", error);
        }
      };
      fetchMovies();
    }
  }, [query]);

  const handleSearch = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} initialQuery={query} />
      <MovieList movies={movies} />
    </div>
  );
}
