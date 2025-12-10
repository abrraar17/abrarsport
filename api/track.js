import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { path } = req.body || {};

    await pool.query(
      "INSERT INTO visits (path) VALUES ($1)",
      [path || "/"]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error tracking visit:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
