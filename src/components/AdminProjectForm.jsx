// src/components/AdminProjectForm.jsx
import { useState } from "react";

export default function AdminProjectForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tech, setTech] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      const imagePath = await uploadImage();
      const res = await fetch("/api/admin/createProject", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description: desc,
          tech_stack: tech,
          github_url: github,
          live_url: live,
          image_path: imagePath,
        }),
      });
      if (!res.ok) throw new Error("Create project failed");
      setTitle("");
      setDesc("");
      setTech("");
      setGithub("");
      setLive("");
      setImageFile(null);
      onSuccess?.();
      alert("Project created.");
    } catch (err) {
      console.error(err);
      alert("Failed to create project");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form className="admin-project-form" onSubmit={handleSubmit}>
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
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Create Project"}
      </button>
    </form>
  );
}

