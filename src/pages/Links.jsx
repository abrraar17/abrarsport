import { useEffect, useState } from "react";
import "../styles/links.css";

const CATEGORIES = ["All", "Electronics", "Fitness", "Skincare & Bodycare", "Toys", "General"];

function Links() {
  const [links, setLinks] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const url = activeCategory === "All"
      ? "/api/admin/links"
      : `/api/admin/links?category=${encodeURIComponent(activeCategory)}`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => setLinks(Array.isArray(data) ? data : []));
  }, [activeCategory]);

  const filtered = links.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="links-container">
      <h1 className="links-title">🛒 Deals</h1>

      <div className="links-search">
        <input
          type="text"
          placeholder="Search for products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-filters">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="links-grid">
        {filtered.map((item) => (

            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="deal-card"
          >
            <div className="deal-image-wrapper">
              <img src={item.image_url} alt={item.title} className="deal-image" />
            </div>
            <div className="deal-label">{item.title}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Links;

