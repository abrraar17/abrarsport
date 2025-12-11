// /api/admin/deleteProject.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "DELETE")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ error: "Missing id" });

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("deleteProject error:", err);
    return res.status(500).json({ error: "Failed to delete project" });
  }
}
