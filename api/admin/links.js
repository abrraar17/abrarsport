import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { method } = req;

  try {
    if (method === "GET") {
      const { data, error } = await supabase
        .from("links")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    }

    if (method === "POST") {
      const { title, description, image_url, url } = req.body;
      if (!title || !url)
        return res.status(400).json({ error: "title and url are required" });

      const { data, error } = await supabase
        .from("links")
        .insert([{ title, description, image_url, url }])
        .select();

      if (error) throw error;
      return res.status(201).json(data[0]);
    }

    if (method === "PUT") {
      const { id, title, description, image_url, url } = req.body;
      if (!id) return res.status(400).json({ error: "id is required" });

      const { error } = await supabase
        .from("links")
        .update({ title, description, image_url, url })
        .eq("id", id);

      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    if (method === "DELETE") {
      const { id } = req.body;
      if (!id) return res.status(400).json({ error: "id is required" });

      const { error } = await supabase.from("links").delete().eq("id", id);
      if (error) throw error;
      return res.status(200).json({ success: true });
    }

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("links handler error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}