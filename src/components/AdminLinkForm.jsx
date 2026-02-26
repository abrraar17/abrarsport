import { useState, useEffect } from "react";

export default function AdminLinkForm({ onSuccess, mode = "add", initialData = null, onCancel }) {
  const [form, setForm] = useState({ title: "", description: "", image_url: "", url: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        image_url: initialData.image_url || "",
        url: initialData.url || "",
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
        setForm({ title: "", description: "", image_url: "", url: "" });
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
      <input name="title" placeholder="Title (e.g. Boat Headphones)" value={form.title} onChange={handleChange} required />
      <input name="description" placeholder="Short description" value={form.description} onChange={handleChange} />
      <input name="image_url" placeholder="Image URL (e.g. /products/boat.jpg)" value={form.image_url} onChange={handleChange} />
      <input name="url" placeholder="Amazon affiliate link" value={form.url} onChange={handleChange} required />
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