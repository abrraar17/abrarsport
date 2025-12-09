function BlogCard({ title, description, date, link }) {
  return (
    <a href={link} style={styles.card}>
      <h3>{title}</h3>
      <p style={styles.desc}>{description}</p>
      <span style={styles.date}>{date}</span>
    </a>
  );
}

const styles = {
  card: {
    display: "block",
    padding: "20px",
    borderRadius: "12px",
    background: "var(--bg-light)",
    color: "var(--text-light)",
    textDecoration: "none",
    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
    width: "280px",
    transition: "0.2s",
  },
  desc: {
    fontSize: "14px",
    marginBottom: "8px",
    opacity: 0.8,
  },
  date: {
    fontSize: "12px",
    opacity: 0.6,
  }
};

export default BlogCard;
