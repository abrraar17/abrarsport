import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { path } = req.body;

  const { error } = await supabase
    .from("visits")
    .insert([{ path }]);

  if (error) {
    console.error("Track error:", error);
    return res.status(500).json({ error: "Failed to insert visit" });
  }

  return res.status(200).json({ success: true });
}



