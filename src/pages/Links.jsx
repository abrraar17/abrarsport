import LinkCard from "../components/LinkCard";
import { links } from "../data/links";
import "../styles/links.css";

function Links() {
  return (
    <div className="links-container">
      <h1 className="links-title">Recommended Links</h1>

      <div className="link-card">
        {links.map((item, i) => (
          <LinkCard
            key={i}
            image={item.image}
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

