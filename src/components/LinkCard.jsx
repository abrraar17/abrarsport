import "../styles/linkcard.css";

function LinkCard({ image, title, description, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="link-card"
    >
      <img src={image} alt={title} className="link-image" />

      <h3 className="link-title">{title}</h3>
      <p className="link-desc">{description}</p>

      <span className="link-btn">Buy Now →</span>
    </a>
  );
}

export default LinkCard;

