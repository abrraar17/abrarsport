import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (method === "POST") {
      const { title, description, tech_stack, github_url, live_url, image_path } = req.body;
      if (!title || !description)
        return res.status(400).json({ error: "Missing fields" });

      const { data, error } = await supabase
        .from("projects")
        .insert([{ title, description, tech_stack, github_url, live_url, image_url: image_path }])
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ project: data });
    }

    if (method === "PUT") {
      const { id, title, description, tech_stack, github_url, live_url, image_path } = req.body;
      if (!id) return res.status(400).json({ error: "Missing id" });

      const { data, error } = await supabase
        .from("projects")
        .update({ title, description, tech_stack, github_url, live_url, image_url: image_path })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ project: data });
    }

    if (method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "Missing id" });

      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("projects handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}