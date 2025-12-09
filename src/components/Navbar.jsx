import { useState, useEffect } from "react";

function Navbar() {
  // Detect theme from localStorage or default to light
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Toggle theme function
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  // Apply theme to body + save preference
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
    const nav = document.querySelector("nav");
if (nav) {
  nav.style.background = darkMode ? "var(--bg-dark)" : "var(--bg-light)";
  nav.style.color = darkMode ? "var(--text-dark)" : "var(--text-light)";
}

  }, [darkMode]);

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Abrarsport</div>

      <div style={styles.links}>
        <a href="/" style={styles.link}>Home</a>
        <a href="/projects" style={styles.link}>Projects</a>
        <a href="/blogs" style={styles.link}>Blogs</a>
        <a href="/links" style={styles.link}>Links</a>
      </div>

      <button onClick={toggleTheme} style={styles.toggleBtn}>
        {darkMode ? "🌙" : "☀️"}
      </button>
    </nav>
  );
}

const styles = {
  navbar: {
  display: "flex",
  justifyContent: "space-between",
  padding: "16px 24px",
  alignItems: "center",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
  position: "sticky",
  top: 0,
  background: "var(--bg-light)",
  color: "var(--text-light)",
},
logo: {
    fontSize: "20px",
    fontWeight: 700,
    color: "inherit",         // ← dynamic color
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "inherit",         // ← dynamic color
    fontSize: "16px",
  },
  toggleBtn: {
    fontSize: "20px",
    background: "none",
    border: "none",
    cursor: "pointer",
    color: "inherit",         // ← dynamic color
  }
};
export default Navbar;
