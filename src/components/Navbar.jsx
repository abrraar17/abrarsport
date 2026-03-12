import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <Link to="/" className="logo">DealPilot</Link>

      <div className="links-desktop">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/links" className="nav-link">Deals</Link>
      </div>

      <div className="header-right">
        <div className="theme-toggle" onClick={toggleTheme}>
          <div className={`icon-wrapper ${theme === "dark" ? "dark" : "light"}`}>
            {theme === "light" ? "🌞" : "🌙"}
          </div>
        </div>

        <div className="theme-label">
          Theme: {theme === "light" ? "Light" : "Dark"}
        </div>

        <button onClick={() => setOpen(!open)} className="menu-btn">☰</button>
      </div>

      {open && (
        <div className="menu-mobile">
          <Link to="/" className="mobile-link" onClick={() => setOpen(false)}>Home</Link>
          <Link to="/links" className="mobile-link" onClick={() => setOpen(false)}>Deals</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;