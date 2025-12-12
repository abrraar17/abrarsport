// /api/admin/getVisits.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


export default async function handler(req, res) {
  if (req.method !== "GET")
    return res.status(405).end();

  try {
    const { data, error } = await supabase
      .from("visits")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw error;

    return res.status(200).json(data);
  } catch (err) {
    console.error("getVisits error:", err);
    return res.status(500).json({ error: "Failed" });
  }
}
