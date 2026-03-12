import { useEffect, useState } from "react";

function Home() {
  const [topPicks, setTopPicks] = useState([]);

  useEffect(() => {
    fetch("/api/admin/links?top_picks=true")
      .then((r) => r.json())
      .then((data) => setTopPicks(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div style={styles.container}>
      {/* Hero Section */}
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

      {/* Top Picks Section */}
      {topPicks.length > 0 && (
        <div style={styles.topPicksSection}>
          <h2 style={styles.topPicksTitle}>🔥 Top Picks</h2>
          <p style={styles.topPicksSubtitle}>Handpicked by DealPilot</p>

          <div style={styles.topPicksGrid}>
            {topPicks.map((item) => (

                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.dealCard}
              >
                <div style={styles.imageWrapper}>
                  <img src={item.image_url} alt={item.title} style={styles.dealImage} />
                </div>
                <div style={styles.dealLabel}>{item.title}</div>
              </a>
            ))}
          </div>

          <a href="/links" style={styles.viewAll}>View All Deals →</a>
        </div>
      )}
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

  topPicksSection: {
    marginTop: "80px",
    paddingTop: "60px",
    borderTop: "1px solid rgba(128,128,128,0.2)",
  },

  topPicksTitle: {
    fontSize: "32px",
    fontWeight: "800",
    marginBottom: "8px",
  },

  topPicksSubtitle: {
    fontSize: "15px",
    opacity: 0.6,
    marginBottom: "32px",
  },

  topPicksGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  dealCard: {
    display: "block",
    borderRadius: "12px",
    overflow: "hidden",
    textDecoration: "none",
    border: "2px solid var(--accent)",
    transition: "transform 0.2s ease",
  },

  imageWrapper: {
    width: "100%",
    aspectRatio: "1",
    overflow: "hidden",
    background: "white",
  },

  dealImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    padding: "10px",
  },

  dealLabel: {
    background: "var(--accent)",
    color: "white",
    textAlign: "center",
    padding: "10px",
    fontSize: "11px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },

  viewAll: {
    display: "inline-block",
    marginTop: "32px",
    color: "var(--accent)",
    fontWeight: "700",
    fontSize: "15px",
    textDecoration: "none",
  },
};

export default Home;