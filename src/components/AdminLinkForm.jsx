import { useState, useEffect } from "react";

const CATEGORIES = ["Electronics", "Fitness", "Skincare & Bodycare", "Toys", "General"];

function extractTitleFromUrl(url) {
  try {
    const match = url.match(/amazon\.[a-z.]+\/([^/]+)\/dp\//i);
    if (match) {
      return match[1]
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    }
  } catch {}
  return "";
}

export default function AdminLinkForm({ onSuccess, mode = "add", initialData = null, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image_url: "",
    url: "",
    category: "General",
    is_top_pick: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        image_url: initialData.image_url || "",
        url: initialData.url || "",
        category: initialData.category || "General",
        is_top_pick: initialData.is_top_pick || false,
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "url") {
      const extractedTitle = extractTitleFromUrl(value);
      setForm({
        ...form,
        url: value,
        title: extractedTitle || form.title,
      });
      return;
    }

    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "edit") {
        const res = await fetch("/api/admin/links", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: initialData.id, ...form }),
        });
        if (!res.ok) throw new Error("Failed to update link");
      } else {
        const res = await fetch("/api/admin/links", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (!res.ok) throw new Error("Failed to add link");
        setForm({ title: "", description: "", image_url: "", url: "", category: "General", is_top_pick: false });
      }
      onSuccess();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
      <input name="url" placeholder="Paste Amazon link first..." value={form.url} onChange={handleChange} required />
      <input name="title" placeholder="Title (auto-filled from URL)" value={form.title} onChange={handleChange} required />
      <input name="image_url" placeholder="Image URL" value={form.image_url} onChange={handleChange} />

      <select name="category" value={form.category} onChange={handleChange}>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input type="checkbox" name="is_top_pick" checked={form.is_top_pick} onChange={handleChange} />
        Mark as Top Pick
      </label>

      <div style={{ display: "flex", gap: "10px" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : mode === "edit" ? "Update Link" : "Add Link"}
        </button>
        {mode === "edit" && onCancel && (
          <button type="button" onClick={onCancel}>Cancel</button>
        )}
      </div>
    </form>
  );
}