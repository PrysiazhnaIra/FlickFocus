import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";
const IMAGE_SIZE = "w500";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MWI0NDZmOTk1NTE2MzUyYWRkMjhmMTU1YTY3YzRhNCIsIm5iZiI6MTcyMjAyNjEzMi40MzYwNCwic3ViIjoiNjZhMzRjMTZmYTQ1NGM5ZjYxMTY0NmY5Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.-lmU7W6pxpghiJP_e4GQU2FaxaE3Y9mLDQ-AY0a5N-I",
  },
});

export const fetchTrendingMovies = async () => {
  try {
    const response = await api.get("/trending/movie/day");
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await api.get("/search/movie", {
      params: { query, include_adult: false, language: "en-US", page: 1 },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const getMovieCredits = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/credits`);
    return response.data.cast;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    throw error;
  }
};

export const getMovieReviews = async (movieId) => {
  try {
    const response = await api.get(`/movie/${movieId}/reviews`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    throw error;
  }
};

export function getImageUrl(path) {
  const defaultImg =
    "https://w7.pngwing.com/pngs/177/551/png-transparent-user-interface-design-computer-icons-default-stephen-salazar-graphy-user-interface-design-computer-wallpaper-sphere-thumbnail.png";
  return path ? `${BASE_IMAGE_URL}${IMAGE_SIZE}${path}` : defaultImg;
}
