import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";

type LayoutProps = { children: React.ReactNode };

export default function Layout({ children }: LayoutProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  return (
    <div className="wrap">
      {/* NAV */}
      <nav className="nav">
        <div className="container nav-inner">
          <div className="brand-cluster">
            <button
              className="menu-toggle"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(v => !v)}
            >
              <span className="bar" />
              <span className="bar" />
              <span className="bar" />
            </button>

            <div className="brand">
              {/* === Place your logo here === */}
              {/* <img src={logoImg} alt="TURSA logo" className="logo" /> */}
              <span className="badge" />
              <span className="brand-name">TURSA</span>
            </div>
          </div>

          <nav className={`menu ${menuOpen ? "open" : ""}`}>
            <NavLink to="/" end onClick={() => setMenuOpen(false)}>Portfolio</NavLink>
            <NavLink to="/about" onClick={() => setMenuOpen(false)}>About</NavLink>
            <NavLink to="/contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
          </nav>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="main container">{children}</main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="footer-brand">
                <span className="badge" />
                <span className="brand-name">TURSA</span>
              </div>
              <p className="footer-desc">
                We build useful software & IoT—clean UIs, reliable backends, and hardware that ships.
              </p>
              <div className="socials">
                <a href="#" className="social-btn" aria-label="GitHub" onClick={(e)=>e.preventDefault()}>GH</a>
                <a href="#" className="social-btn" aria-label="X" onClick={(e)=>e.preventDefault()}>X</a>
                <a href="#" className="social-btn" aria-label="LinkedIn" onClick={(e)=>e.preventDefault()}>In</a>
              </div>
            </div>

            <div className="footer-col">
              <h4>Explore</h4>
              <ul className="footer-list">
                <li><NavLink className="footer-link" to="/" end>Portfolio</NavLink></li>
                <li><NavLink className="footer-link" to="/about">About</NavLink></li>
                <li><NavLink className="footer-link" to="/contact">Contact</NavLink></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Resources</h4>
              <ul className="footer-list">
                <li><a className="footer-link" href="#">Case studies</a></li>
                <li><a className="footer-link" href="#">Docs</a></li>
                <li><a className="footer-link" href="#">Privacy</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} TURSA. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
