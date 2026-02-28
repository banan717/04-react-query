import { FormEvent } from "react";
import styles from "./SearchBar.module.css";
import React from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const query = (form.elements.namedItem("query") as HTMLInputElement).value.trim();

    if (!query) return;

    onSearch(query);
    form.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className={styles.input}
            type="text"
            name="query"
            placeholder="Search movies..."
            autoComplete="off"
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
