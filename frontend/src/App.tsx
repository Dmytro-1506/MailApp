import { Routes, Route } from "react-router-dom";

import MailPage from "./pages/MailPage/MailPage";
import SearchPage from "./pages/SearchPage/SearchPage";
import LoginPage from "./pages/LoginPage/LoginPage";

import Navbar from "./components/Navbar/Navbar";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<MailPage />} />

        <Route
          path="/search"
          element={<SearchPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />
      </Routes>
    </>
  );
}