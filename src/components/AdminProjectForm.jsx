// src/components/AdminProjectForm.jsx
import { useEffect, useState } from "react";

export default function AdminProjectForm({
  onSuccess,
  mode = "create",
  initialData = null,
  onCancel,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setDesc(initialData.description || "");
      setTech(initialData.tech_stack || "");
      setGithub(initialData.github_url || "");
      setLive(initialData.live_url || "");
    }
  }, [mode, initialData]);

  async function uploadImage() {
    if (!imageFile) return null;

    const file = imageFile;
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const base64 = reader.result.split(",")[1];
        const contentType = file.type || "image/jpeg";

        try {
          const res = await fetch("/api/admin/uploadImage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fileName: `projects/${Date.now()}-${file.name}`,
              base64,
              contentType,
            }),
          });

          const json = await res.json();
          resolve(json.path || null);
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setUploading(true);

    try {
      const uploadedImagePath = await uploadImage();

      const payload = {
        title,
        description: desc,
        tech_stack: tech,
        github_url: github,
        live_url: live,
        image_path:
          uploadedImagePath ||
          (mode === "edit" ? initialData?.image_url : null),
      };

      if (mode === "edit") {
        payload.id = initialData.id;
      }

      const res = await fetch("/api/admin/projects", {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Submit failed");

      onSuccess?.();

      if (mode === "create") {
        setTitle("");
        setDesc("");
        setTech("");
        setGithub("");
        setLive("");
        setImageFile(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit project");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form className="admin-project-form" onSubmit={handleSubmit}>
      <h4>{mode === "edit" ? "Edit Project" : "Create Project"}</h4>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />

      <input
        placeholder="Tech stack (comma separated)"
        value={tech}
        onChange={(e) => setTech(e.target.value)}
      />

      <input
        placeholder="GitHub URL"
        value={github}
        onChange={(e) => setGithub(e.target.value)}
      />

      <input
        placeholder="Live URL"
        value={live}
        onChange={(e) => setLive(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files[0])}
      />

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={uploading}>
          {uploading
            ? "Saving..."
            : mode === "edit"
            ? "Save Changes"
            : "Create Project"}
        </button>

        {mode === "edit" && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}