// /api/admin/uploadImage.js
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
    const { fileName, base64, contentType } = req.body;

    if (!fileName || !base64) {
      return res.status(400).json({ error: "Missing fileName or base64" });
    }

    const buffer = Buffer.from(base64, "base64");
    const bucket = "project-images";

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, buffer, {
        contentType: contentType || "image/jpeg",
        upsert: true,
      });

    if (error) throw error;

    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return res.status(200).json({
      path: publicData.publicUrl,
      rawPath: data.path,
    });
  } catch (err) {
    console.error("uploadImage error:", err);
    return res.status(500).json({ error: "Failed to upload image" });
  }
}


