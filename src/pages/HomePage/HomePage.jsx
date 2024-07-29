import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      }
    };
    getTrendingMovies();
  }, []);
  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Trending Movies Today</h1>
      <MovieList movies={movies} />
      <Outlet />
    </div>
  );
}
