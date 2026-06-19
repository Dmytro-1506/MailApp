import { useState } from "react";
import styles from "./SearchInput.module.css";

type Props = {
    onSearch: (query: string) => void;
};

export default function SearchInput({ onSearch }: Props) {

    const [query, setQuery] = useState("");

    function handleSearch() {

        if (!query.trim())
            return;

        onSearch(query);
    }

    return (
        <div className={styles.container}>

            <input
                className={styles.input}
                value={query}
                onChange={(e) =>
                    setQuery(
                        e.target.value
                    )
                }
                placeholder="Search companies..."
            />

            <button
                className={styles.button}
                onClick={handleSearch}
            >
                Search
            </button>

        </div>
    );
}