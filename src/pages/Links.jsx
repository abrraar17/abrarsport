// src/pages/Links.jsx
import { useEffect, useState } from "react";
import LinkCard from "../components/LinkCard";
import "../styles/links.css";

function Links() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch("/api/admin/getLinks")
      .then((r) => r.json())
      .then((data) => setLinks(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div className="links-container">
      <h1 className="links-title">Recommended Links</h1>
      <div className="links-grid">
        {links.map((item) => (
          <LinkCard
            key={item.id}
            image={item.image_url}
            title={item.title}
            description={item.description}
            url={item.url}
          />
        ))}
      </div>
    </div>
  );
}

export default Links;

