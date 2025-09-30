import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Layout.css";
import githubImg from "../assets/github (3).png";
import linkedinImg from "../assets/linkedin.png";
import youtubeImg from "../assets/youtube.png";
import instagramImg from "../assets/instagram.png";
import logo from "../assets/NoBGLogo.png";
import icon from "../assets/IconNoBGLogo.png"

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
                <img 
                src={icon} 
                alt="TURSA Logo" 
                style={{ width: "64px", height: "64px", objectFit: "contain" }} 
                />
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
                <div className="footer-brand" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img 
                  src={logo} 
                  alt="TURSA Logo" 
                  style={{ width: "110px", height: "110px", objectFit: "contain" }} 
                />
                </div>
              <p className="footer-desc">
                We build useful software & IoT—clean UIs, reliable backends, and hardware that ships. This is where creativity meets accessibility.
              </p>
              <div className="socials">
                <a href="https://github.com/tursa-technologies" className="social-btn" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={githubImg} 
                    alt="GitHub" 
                    style={{ width: "24px", height: "24px" }} 
                  />
                </a>

                <a href="xx" className="social-btn" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={linkedinImg} 
                    alt="LinkedIn" 
                    style={{ width: "24px", height: "24px" }} 
                  />
                </a>

                <a href="https://www.youtube.com/@TURSA-TECH" className="social-btn" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={youtubeImg} 
                    alt="YouTube" 
                    style={{ width: "24px", height: "24px" }} 
                  />
                </a>

                <a href="https://www.instagram.com/tursa_tech/" className="social-btn" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <img 
                    src={instagramImg} 
                    alt="Instagram" 
                    style={{ width: "24px", height: "24px" }} 
                  />
                </a>
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
          </div>

          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} TURSA. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


