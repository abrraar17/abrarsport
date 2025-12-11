// /api/admin/updateProject.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "PUT")
    return res.status(405).json({ error: "Method not allowed" });

  try {
    const { id, title, description, tech_stack, github_url, live_url, image_path } = req.body;

    if (!id) return res.status(400).json({ error: "Missing id" });

    const { data, error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        tech_stack,
        github_url,
        live_url,
        image_url: image_path,
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ project: data });
  } catch (err) {
    console.error("updateProject error:", err);
    return res.status(500).json({ error: "Failed to update project" });
  }
}
