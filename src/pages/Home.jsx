function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Hello, I’m Abrar 👋</h1>
      <p style={styles.subtitle}>
         this is a modern digital space showcasing my projects, blogs, and tools.
      </p>

      <div style={styles.buttons}>
        <a href="/projects" style={styles.button}>Projects</a>
        <a href="/blogs" style={styles.button}>Blogs</a>
        <a href="/links" style={styles.button}>Links</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    paddingTop: "80px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },

  title: {
    fontSize: "42px",
    fontWeight: "700",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "700px",
    margin: "0 auto 40px",
    opacity: 0.8,
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  button: {
    padding: "12px 24px",
    background: "var(--accent)",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
  },
};

export default Home;
