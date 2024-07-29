import { Suspense, useEffect, useState, useRef } from "react";
import { useParams, Outlet, Link, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../api/tmdbApi";
import { getImageUrl } from "../../api/tmdbApi";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const goBackRef = useRef(location.state?.from || "/movies");

  useEffect(() => {
    const fetchMoviesDetails = async () => {
      try {
        const movieData = await getMovieDetails(movieId);

        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    fetchMoviesDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={css.generalBlok}>
      <Link to={goBackRef.current} className={css.goBackButton}>
        Go back to movies!
      </Link>

      {movie && (
        <div className={css.block}>
          <div className={css.imgBlock}>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={css.image}
            />
          </div>
          <div className={css.infBlock}>
            <h1 className={css.title}>{movie.title}</h1>
            <p className={css.text}>{movie.overview}</p>
            <p className={css.text}>{movie.status}</p>
            <p className={css.text}>
              <strong>Rating:</strong> {movie.vote_average}
            </p>
            <p className={css.text}>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
          </div>
          <Link
            to="cast"
            className={css.linkCast}
            state={{ from: location.state?.from }}
          >
            Cast
          </Link>
          <Link
            to="reviews"
            className={css.linkReviews}
            state={{ from: location.state?.from }}
          >
            Reviews
          </Link>
          <Suspense fallback={<h2>LOADING...</h2>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </div>
  );
}
