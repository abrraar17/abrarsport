function LinkCard({ image, title, description, url }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />

      <h3 style={styles.title}>{title}</h3>
      <p style={styles.desc}>{description}</p>

      <a href={url} target="_blank" style={styles.button}>
        Buy Now →
      </a>
    </div>
  );
}

const styles = {
  card: {
    background: "var(--bg-light)",
    color: "var(--text-light)",
    borderRadius: "12px",
    padding: "20px",
    width: "280px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    transition: "0.2s",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  title: {
    fontSize: "20px",
    marginBottom: "6px",
  },
  desc: {
    fontSize: "14px",
    opacity: 0.85,
    marginBottom: "16px",
  },
  button: {
    display: "inline-block",
    textDecoration: "none",
    background: "var(--accent)",
    color: "white",
    padding: "10px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
  }
};

export default LinkCard;
