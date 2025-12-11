// /api/projects.js
import { createClient } from "@supabase/supabase-js";

/**
 * This file MUST live under /api (serverless) so it runs on the server.
 * It uses the SERVICE ROLE key (server-only) to safely query the projects table.
 *
 * The code is defensive about env var names: it will use SUPABASE_URL if present,
 * otherwise fallback to NEXT_PUBLIC_SUPABASE_URL (which you already added).
 */

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL) {
  console.error("Missing SUPABASE_URL env var");
}
if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY env var");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Projects fetch error:", error);
      return res.status(500).json({ error: "Failed to fetch projects" });
    }

    return res.status(200).json(data);
  } catch (err) {
    console.error("Projects handler exception:", err);
    return res.status(500).json({ error: "Server error" });
  }
}


