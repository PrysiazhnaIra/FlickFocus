import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../api/tmdbApi";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getTrendingMovies = async () => {
      setLoading(true);
      try {
        const trendingMovies = await fetchTrendingMovies(page);
        if (trendingMovies.length === 0) {
          setHasMore(false); // No more movies to load
        }
        setMovies((prevMovies) => [
          ...prevMovies,
          ...trendingMovies.filter(
            (movie) => !prevMovies.some((prev) => prev.id === movie.id)
          ),
        ]);
      } catch (error) {
        console.error("Error fetching trending movies:", error);
      } finally {
        setLoading(false);
      }
    };
    getTrendingMovies();
  }, [page]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  return (
    <div className={css.container}>
      <h1 className={css.mainTitle}>Trending Movies Today</h1>
      <MovieList movies={movies} />
      <button
        onClick={handleLoadMore}
        disabled={loading || !hasMore}
        className={css.loadMoreButton}
      >
        {loading ? "Loading..." : hasMore ? "Load More" : "No More Movies"}
      </button>
      <Outlet />
    </div>
  );
}
