// /api/admin/createProject.js
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
    const {
      title,
      description,
      tech_stack,
      github_url,
      live_url,
      image_path, // this MUST be full public URL
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (!image_path || !image_path.startsWith("http")) {
      return res.status(400).json({
        error: "Invalid image URL. Public image URL required.",
      });
    }

    const { data, error } = await supabase
      .from("projects")
      .insert([
        {
          title,
          description,
          tech_stack,
          github_url,
          live_url,
          image_url: image_path, // ✅ FULL public URL stored
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(200).json({ project: data });
  } catch (err) {
    console.error("createProject error:", err);
    return res.status(500).json({ error: "Failed to create project" });
  }
}

