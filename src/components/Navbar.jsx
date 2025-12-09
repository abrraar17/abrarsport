import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="logo">Abrarsport</Link>

      {/* Desktop Links */}
      <div className="links-desktop">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/projects" className="nav-link">Projects</Link>
        <Link to="/blogs" className="nav-link">Blogs</Link>
        <Link to="/links" className="nav-link">Links</Link>
      </div>

      {/* Theme Toggle */}
      <button onClick={toggleTheme} className="toggle-btn">
        {theme === "light" ? "🌙" : "🌞"}
      </button>

      {/* Hamburger */}
      <button onClick={() => setOpen(!open)} className="menu-btn">☰</button>

      {/* Mobile Menu */}
      {open && (
        <div className="menu-mobile">
          <Link to="/" className="mobile-link" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/projects" className="mobile-link" onClick={() => setOpen(false)}>Projects</Link>
          <Link to="/blogs" className="mobile-link" onClick={() => setOpen(false)}>Blogs</Link>
          <Link to="/links" className="mobile-link" onClick={() => setOpen(false)}>Links</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


