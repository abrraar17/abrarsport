import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <Link to="/" style={styles.logo}>
        Abrarsport
      </Link>

      {/* Desktop Menu */}
      <div style={styles.linksDesktop}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/projects">Projects</Link>
        <Link style={styles.link} to="/blogs">Blogs</Link>
        <Link style={styles.link} to="/links">Links</Link>
      </div>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} style={styles.toggleBtn}>
        {theme === "light" ? "🌙" : "🌞"}
      </button>

      {/* Hamburger Menu Button (Mobile) */}
      <button onClick={() => setOpen(!open)} style={styles.menuBtn}>
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div style={styles.menuMobile}>
          <Link style={styles.mobileLink} to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link style={styles.mobileLink} to="/projects" onClick={() => setOpen(false)}>Projects</Link>
          <Link style={styles.mobileLink} to="/blogs" onClick={() => setOpen(false)}>Blogs</Link>
          <Link style={styles.mobileLink} to="/links" onClick={() => setOpen(false)}>Links</Link>
        </div>
      )}
    </nav>
  );
}

const styles = {
  nav: {
    padding: "15px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    background: "var(--bg-light)",
    color: "var(--text-light)",
    borderBottom: "1px solid var(--card-border)",
  },
  logo: {
    fontSize: "20px",
    fontWeight: 700,
    textDecoration: "none",
    color: "var(--text-light)",
  },
  linksDesktop: {
    display: "flex",
    gap: "20px",
  },
  link: {
    textDecoration: "none",
    color: "var(--text-light)",
    fontSize: "16px",
  },
  toggleBtn: {
    background: "none",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
    marginLeft: "10px",
  },

  /* Hamburger Button (only mobile) */
  menuBtn: {
    background: "none",
    border: "none",
    fontSize: "26px",
    cursor: "pointer",
    display: "none",
  },

  /* Mobile Menu Drawer */
  menuMobile: {
    position: "absolute",
    top: "60px",
    right: "20px",
    background: "var(--bg-light)",
    borderRadius: "10px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
    padding: "15px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    zIndex: 10,
  },
  mobileLink: {
    textDecoration: "none",
    color: "var(--text-light)",
    fontSize: "16px",
  },
};

/* RESPONSIVE RULES */
styles["@media (max-width: 768px)"] = {
  linksDesktop: {
    display: "none",
  },
  menuBtn: {
    display: "block",
  },
};

export default Navbar;

