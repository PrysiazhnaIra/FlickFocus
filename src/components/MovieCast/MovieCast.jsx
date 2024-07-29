import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../api/tmdbApi";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const defaultImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAaJS0dnDYQ5NkVr30LWhCjQoMLtm6BC0TDA&s";

  useEffect(() => {
    async function fetchCredits() {
      try {
        const credits = await getMovieCredits(movieId);
        setCast(credits);
      } catch (error) {
        console.error("Error fetching movie credits:", error);
      }
    }
    fetchCredits();
  }, [movieId]);
  return (
    <div className={css.container}>
      {cast.map((actor) => (
        <div key={actor.id} className={css.actor}>
          <img
            src={
              actor.profile_path
                ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                : defaultImg
            }
            alt={actor.name}
            className={css.image}
          />
          <p className={css.name}>{actor.name}</p>
          <p className={css.character}>{actor.character}</p>
        </div>
      ))}
    </div>
  );
}
