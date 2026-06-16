import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>
                Bewerbung App
            </div>

            <Link
                to="/login"
                className={`${styles.link} ${
                    location.pathname === "/login"
                        ? styles.active
                        : ""
                }`}
            >
                Login
            </Link>

            <Link
                to="/search"
                className={`${styles.link} ${
                    location.pathname === "/search"
                        ? styles.active
                        : ""
                }`}
            >
                Search
            </Link>

            <Link
                to="/"
                className={`${styles.link} ${
                    location.pathname === "/"
                        ? styles.active
                        : ""
                }`}
            >
                Meine Bewerbungen
            </Link>
        </nav>
    );
}