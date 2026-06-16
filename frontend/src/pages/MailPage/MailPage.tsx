import { useEffect, useState } from "react";
import "./MailPage.css";

type Email = {
  id: number;
  to_email: string;
  subject: string;
  message: string;
  created_at: string;
};

export default function MailPage() {
  const [to, setTo] = useState("");
  const [emails, setEmails] = useState<Email[]>([]);
  const [sortBy, setSortBy] = useState("date-desc");

  const fetchEmails = () => {
    fetch("http://localhost:3000/emails")
      .then(res => res.json())
      .then(data => setEmails(data));
  };

  useEffect(() => {
    fetchEmails();
  }, []);

const sendEmail = async () => {

  const isValid =
    await checkEmail();

    if (!isValid) {
      return;
    }

    await fetch(
      "http://localhost:3000/emails",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          to,
        }),
      }
    );

    alert("Bewerbung gesendet");

    setTo("");

    fetchEmails();
  };

  const deleteEmail = async (id: number) => {
  try {
    const res = await fetch(
      `http://localhost:3000/emails/${id}`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    fetchEmails();
  } catch (err) {
    console.error(err);
    alert("Could not delete email");
  }
  };
  
  const sortedEmails = [...emails].sort((a, b) => {
  switch (sortBy) {
    case "id":
      return a.id - b.id;

    case "email":
      return a.to_email.localeCompare(b.to_email);

    case "date-asc":
      return (
        new Date(a.created_at).getTime() -
        new Date(b.created_at).getTime()
      );

    case "date-desc":
    default:
      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
  }
  });
  
  const checkEmail = async () => {

    // remove spaces
    const email = to.trim().toLowerCase();

    if (!email) {
      alert("Bitte Email eingeben");
      return false;
    }

    // standard email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("Ungültige Email-Adresse");
      return false;
    }

    // check duplicate
    const exists = emails.some(
      e =>
        e.to_email
          .toLowerCase()
          .trim() === email
    );

    if (exists) {
      alert(
        "Du hast dich bereits bei dieser Firma beworben."
      );

      return false;
    }

    return true;
  };

  return (
    <div style={{ padding: 20 }}>

      {/* SEND EMAIL SECTION */}
      <div className="send-box">

        <input
            className="input"
            placeholder="wobei möchtest Du dich bewerben"
            value={to}
            onChange={e => setTo(e.target.value)}
        />

        <button className="button" onClick={sendEmail} >
            Bewerben
        </button>
        </div>

      {/* EMAIL TABLE */}
        <div>
          <div className="table-header">

            <h2 className="subtitle">
              frühere Bewerbungen
            </h2>

            <div className="sort-container">

              <label className="sort-label">
                Sortieren:
              </label>

              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">
                  Neueste zuerst
                </option>

                <option value="date-asc">
                  Älteste zuerst
                </option>

                <option value="id">
                  ID
                </option>

                <option value="email">
                  Email A → Z
                </option>

              </select>

            </div>

          </div>

        <table border={1} cellPadding={10}>
        <thead>
            <tr>
              <th>ID</th>
              <th>To</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {sortedEmails.map(email => (
              <tr key={email.id}>
                <td>{email.id}</td>
                <td>{email.to_email}</td>
                <td style={{ fontSize: 14 }}>{email.subject}</td>
                <td>{email.message}</td>
                <td>{new Date(email.created_at).toLocaleString()}</td>
                <td>
                  <button className="delete-button"
                          onClick={() => confirm("Delete this email?") && deleteEmail(email.id)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14H7L5 6" />
                      <path d="M10 11v6" />
                      <path d="M14 11v6" />
                      <path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}