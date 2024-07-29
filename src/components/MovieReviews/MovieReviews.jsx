import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdbApi";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const reviews = await getMovieReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <div className={css.container}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className={css.review}>
            <h3 className={css.author}>{review.author}</h3>
            <p className={css.content}>{review.content}</p>
          </div>
        ))
      ) : (
        <p className={css.noReviews}>No reviews available.</p>
      )}
    </div>
  );
}
