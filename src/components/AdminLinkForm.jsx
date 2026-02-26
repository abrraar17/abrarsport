import { useState } from "react";

export default function AdminLinkForm({ onSuccess }) {
  const [form, setForm] = useState({ title: "", description: "", image_url: "", url: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/admin/addLink", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add link");
      setForm({ title: "", description: "", image_url: "", url: "" });
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
      <button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Link"}</button>
    </form>
  );
}