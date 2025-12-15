// /api/track.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { path } = req.body;

    const ip =
      req.headers["x-forwarded-for"]?.split(",")[0] ||
      req.socket?.remoteAddress ||
      null;

    const userAgent = req.headers["user-agent"] || null;

    const { error } = await supabase.from("visits").insert([
      {
        path,
        ip_address: ip,
        user_agent: userAgent,
      },
    ]);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Track error:", err);
    return res.status(500).json({ error: "Failed to insert visit" });
  }
}



