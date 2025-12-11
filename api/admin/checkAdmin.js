// /api/admin/checkAdmin.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).end();

  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ isAdmin: false });

    // Check if this email exists in admin_users table
    const { data, error } = await supabase
      .from("admin_users")
      .select("email")
      .eq("email", email)
      .single();

    // If not found → error.code = PGRST116 (no rows)
    if (error && error.code !== "PGRST116") {
      console.error("checkAdmin error:", error);
      return res.status(500).json({ isAdmin: false });
    }

    return res.status(200).json({ isAdmin: !!data });
  } catch (err) {
    console.error("checkAdmin error:", err);
    return res.status(500).json({ isAdmin: false });
  }
}
