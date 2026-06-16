import fs from "fs";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg";
import nodemailer from "nodemailer";
import searchSearXNG from "./searxng";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  host: "db",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "emails"
});


// email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // IMPORTANT for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS emails (
      id SERIAL PRIMARY KEY,
      to_email TEXT,
      subject TEXT,
      message TEXT,
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);

  console.log("Emails table ready");
}

// send email endpoint
app.post("/emails", async (req, res) => {
  let { to } = req.body;

    // fallback defaults
  to = to || "kyunlik@gmail.com";
  const subject = "Bewerbung um einen Platz für die betriebliche Praxisphase als Fachinformatiker für Anwendungsentwicklung";
  const message = "Empty message";
  const path = require("path");
  const filePath = path.join(process.cwd(), "files", "Bewerbungsunterlagen_Anwendungsentwickler_Dmytro_Shkilniuk.pdf");
  const textPath = path.join(process.cwd(), "files", "emailText.html");
  const htmlContent = fs.readFileSync(textPath, "utf-8");

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text: message,
      html: htmlContent,
      attachments: [
      {
        filename: "Bewerbungsunterlagen_Anwendungsentwickler_Dmytro_Shkilniuk.pdf",
        path: filePath,
      },
    ],
    });

    // store in DB
    await pool.query(
      `
      INSERT INTO emails (to_email, subject, message)
      VALUES ($1, $2, $3)
      `,
      [to, subject, message]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get("/emails", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM emails ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch emails" });
  }
});

app.delete("/emails/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(
      "DELETE FROM emails WHERE id = $1",
      [id]
    );

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});

app.get("/search", async (req, res) => {

  try {
    const query = req.query.q as string;

    if (!query) {
      return res.status(400).json({
        error: "Query required"
    });
    }

    const results = await searchSearXNG(query);
    return res.json(results);

  } catch (err) {
      console.error("Search error:", err);
      
      return res.status(500).json({error: "Search failed"});
    }
});
  
async function waitForDb() {

  while (true) {
    try {

      await pool.query("SELECT 1");
      console.log("DB connected");
      return;

    } catch {
      console.log("Waiting for DB...");

      await new Promise(r => setTimeout(r, 3000));
    }
  }
}

async function startServer() {
  await waitForDb();
  await initDb();

  app.listen(3000, () => {
    console.log("Backend running on port 3000");
  });
}

startServer().catch((err) => {
  console.error("Startup failed:", err);
  process.exit(1);
});