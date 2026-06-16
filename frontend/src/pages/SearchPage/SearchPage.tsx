import { useState } from "react";
import styles from "./SearchPage.module.css";

type SearchResult = {
  title: string;
  url: string;
  snippet?: string;
  content?: string;
};

export default function SearchPage() {

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const search = async () => {

    if (!query.trim()) return;

    setLoading(true);

    try {

      const res = await fetch(
      `http://localhost:3000/search?q=${encodeURIComponent(query)}`
      );

      const data = await res.json();
      console.log("FROM BACKEND:", data);

      setResults(data);

    } catch (err) {
      console.error(err);
      alert("Search failed");

    } finally {
        setLoading(false);
    }
  };

  return (
    <div className={styles.page}>

      <h1 className={styles.title}>
        Search Companies
      </h1>
      

      <div className={styles.searchBar}>

        <input
            className={styles.input}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
        />

        <button
            className={styles.button}
            onClick={search}
        >
            Search
        </button>

      </div>

      {loading && (
        <p className={styles.loading}>
            Searching...
        </p>
      )}

      {!loading && results.length === 0 && (
        <p className={styles.empty}>
            No results
        </p>
      )}

      <div className={styles.results}>

        {results.map((r, index) => (

            <div
                key={index}
                className={styles.card}
            >

                <h3 className={styles.resultTitle}>
                    {r.title}
                </h3>

                <a
                    className={styles.link}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open →
                </a>

                <p className={styles.snippet}>
                    {r.snippet || r.content}
                </p>

            </div>
        ))}
    </div>
</div>
);
}

