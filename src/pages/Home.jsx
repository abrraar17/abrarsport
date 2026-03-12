function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.badge}>🚀 Handpicked Deals & Tech Insights</div>

      <h1 style={styles.title}>
        Your Pilot for <span style={styles.highlight}>Smart Deals</span>
      </h1>

      <p style={styles.subtitle}>
        Discover the best products and curated recommendations —
        all in one place. No fluff, just value.
      </p>

      <div style={styles.buttons}>
        <a href="/links" style={styles.buttonPrimary}>🛒 Shop Deals</a>
      </div>

      <div style={styles.stats}>
        <div style={styles.stat}>
          <span style={styles.statNumber}>100%</span>
          <span style={styles.statLabel}>Honest Reviews</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statNumber}>0₹</span>
          <span style={styles.statLabel}>Extra Cost to You</span>
        </div>
        <div style={styles.stat}>
          <span style={styles.statNumber}>✓</span>
          <span style={styles.statLabel}>Curated Products</span>
        </div>
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
    paddingBottom: "60px",
  },

  badge: {
    display: "inline-block",
    background: "var(--accent)",
    color: "white",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "24px",
    opacity: 0.9,
  },

  title: {
    fontSize: "48px",
    fontWeight: "800",
    marginBottom: "16px",
    lineHeight: "1.2",
  },

  highlight: {
    color: "var(--accent)",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "600px",
    margin: "0 auto 40px",
    opacity: 0.75,
    lineHeight: "1.6",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "16px",
    marginTop: "20px",
    flexWrap: "wrap",
  },

  buttonPrimary: {
    padding: "14px 28px",
    background: "var(--accent)",
    color: "white",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "700",
  },

  stats: {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    marginTop: "64px",
    flexWrap: "wrap",
  },

  stat: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
  },

  statNumber: {
    fontSize: "28px",
    fontWeight: "800",
    color: "var(--accent)",
  },

  statLabel: {
    fontSize: "13px",
    opacity: 0.65,
    fontWeight: "500",
  },
};

export default Home;