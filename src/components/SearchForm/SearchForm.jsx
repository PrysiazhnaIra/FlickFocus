import css from "./SearchForm.module.css";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";

export default function SearchForm({ onSearch, initialQuery }) {
  const [query, setQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      toast("Please, enter the name of the movie!", {
        icon: "ℹ️",
      });
      return;
    }
    setIsLoading(true);
    try {
      await onSearch(query);
    } finally {
      setIsLoading(false);
    }
    setQuery("");
  };
  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          placeholder="Enter your query..."
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={css.input}
        />
        <button type="submit" className={css.button}>
          Search
        </button>
      </form>
      {isLoading && <Loader />}
    </header>
  );
}
