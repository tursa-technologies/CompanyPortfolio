import React, { useState } from "react";
import keyboardImg from "./assets/keyboard.jpg";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

/* ===============================
   Types
================================= */
type Project = {
  id: string;
  name: string;
  tag: string;
  coverText?: string;
  cover?: string; // string path returned by Vite for imported assets
  blurb: string;
  details: string;
};

type WithChildren = React.PropsWithChildren<{}>;

/* ===============================
   App (Router)
================================= */
export default function App(): React.ReactElement {
  return (
    <BrowserRouter>
      <SiteChrome>
        <Routes>
          <Route path="/" element={<PortfolioPage />} />
        <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </SiteChrome>
    </BrowserRouter>
  );
}

/* ===============================
   Layout (nav + footer)
================================= */
function SiteChrome({ children }: WithChildren): React.ReactElement {
  const css = `
  :root{
    /* Solid theme colors */
    --bg:        #0e1118; /* SOLID background */
    --surface:   #151a24;
    --elev:      #1a2233;
    --line:      rgba(255,255,255,.08);

    --ink:       #e9edf5;
    --muted:     #a6b0c3;

    --brand:     #8b5cf6;
    --brand-2:   #22d3ee;

    --radius-lg: 18px;
    --radius-md: 14px;
    --radius-sm: 10px;

    --shadow-sm: 0 4px 20px rgba(0,0,0,.25);
    --shadow-md: 0 10px 30px rgba(0,0,0,.35);

    --h1: clamp(32px, 4vw, 44px);
    --h2: clamp(22px, 2.6vw, 28px);
    --h3: 18px;
    --body: 16px;
  }

  *{box-sizing:border-box}
  html,body,#root{height:100%}
  body{
    margin:0;
    background: var(--bg); /* solid */
    color:var(--ink);
    font: var(--body)/1.65 ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Inter, Arial, sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  a{color:inherit; text-decoration:none}
  .container{max-width:1200px; margin:0 auto; padding:0 22px}

  .wrap{min-height:100svh; display:flex; flex-direction:column}
  main{flex:1}

  /* NAV */
  .nav{
    position:sticky; top:0; z-index:40;
    background:rgba(10,13,18,.6);
    backdrop-filter: saturate(150%) blur(8px);
    border-bottom:1px solid var(--line);
  }
  .nav-inner{display:flex; align-items:center; justify-content:space-between; padding:12px 0}
  .brand{display:flex; align-items:center; gap:10px; font-weight:800; letter-spacing:.3px}
  .badge{width:28px; height:28px; border-radius:9px; background:
    linear-gradient(135deg, var(--brand), var(--brand-2));
    box-shadow: 0 0 0 2px rgba(139,92,246,.35), 0 0 26px rgba(34,211,238,.18);
  }
  .menu{display:flex; gap:6px}
  .menu a{opacity:.9; padding:8px 12px; border-radius:12px; border:1px solid transparent}
  .menu a:hover{background:rgba(255,255,255,.05)}
  .menu a.active{background:rgba(255,255,255,.08); border-color:var(--line)}

  /* SECTIONS */
  .section{padding: clamp(56px, 8vw, 90px) 0}
  .title{font-size: var(--h1); line-height:1.08; letter-spacing:-.6px; margin:0 0 10px}
  .lead{color:var(--muted); max-width:68ch; margin:0}

  /* BUTTONS */
  .btn{
    display:inline-flex; align-items:center; justify-content:center;
    gap:10px; padding:12px 16px; border-radius:12px; border:none;
    background:linear-gradient(135deg, var(--brand), var(--brand-2));
    color:#fff; font-weight:700; box-shadow: var(--shadow-sm);
    transition: transform .12s ease, filter .2s ease;
  }
  .btn:hover{transform: translateY(-1px); filter: brightness(1.05)}

  /* FEATURED */
  .featured{
    position:relative; border-radius:var(--radius-lg); overflow:hidden;
    border:1px solid var(--line);
    background: linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,.02));
    box-shadow: var(--shadow-md);
  }
  .featured-visual{position:relative; aspect-ratio: 16/7; overflow:hidden}
  .featured-visual .img{
    position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
    font-size: clamp(28px, 2.8vw, 36px); color:rgba(255,255,255,.92); font-weight:800; letter-spacing:.6px;
    background: linear-gradient(135deg, rgba(139,92,246,.18), rgba(34,211,238,.16));
  }
  .featured-info{display:flex; gap:18px; align-items:center; justify-content:space-between; padding:18px 18px 20px}
  .chip{display:inline-flex; gap:8px; align-items:center; padding:6px 10px; border:1px solid var(--line); border-radius:999px; color:var(--muted); background:rgba(255,255,255,.03)}

  /* GRID */
  .grid{display:grid; grid-template-columns:repeat(3, 1fr); gap:18px}
  .tile{
    background:linear-gradient(180deg, rgba(255,255,255,.03), rgba(255,255,255,.01));
    border:1px solid var(--line); border-radius:16px; overflow:hidden;
    box-shadow: var(--shadow-sm);
  }
  .tile-head{position:relative; overflow:hidden}
  .tile-media{position:relative; height:220px; overflow:hidden; background:#0f1522}
  .tile-media img{
    width:100%; height:100%;
    object-fit:cover; object-position:center;
    display:block;
    transform:scale(1); transition: transform .22s ease;
  }
  .tile-media::after{
    content:""; position:absolute; inset:0;
    background: linear-gradient(180deg, rgba(0,0,0,.0), rgba(0,0,0,.18));
    pointer-events:none;
  }
  .tile:hover .tile-media img{transform:scale(1.035)}
  .tile-name{
    position:absolute; left:12px; bottom:12px;
    padding:6px 10px; font-size:12.5px;
    background:rgba(0,0,0,.38); border:1px solid rgba(255,255,255,.18);
    border-radius:10px; color:#fff; backdrop-filter: blur(4px)
  }
  .tile-body{padding:14px}
  .muted{color:var(--muted)}
  .expand-btn{
    margin-top:12px; padding:9px 12px; border-radius:10px; border:1px solid var(--line);
    background:var(--elev); color:var(--ink);
    transition: filter .2s ease, transform .12s ease;
  }
  .expand-btn:hover{filter: brightness(1.06); transform: translateY(-1px)}
  .expand{border-top:1px dashed var(--line); margin-top:12px; padding-top:12px}

  /* ---- Spacing tweaks you asked for ---- */
  /* About: a bit more space between the top and the paragraph */
  .about-intro{ margin-top: 18px; }           /* space between title and paragraph */
  .about-grid{ margin-top: 28px; }            /* space before the cards */

  /* Contact: more breathing room between groups */
  form.contact > .group{ margin-bottom: 18px; }
  form.contact .row{ display:grid; grid-template-columns:1fr 1fr; gap:18px }
  form.contact label{display:block; margin:0 0 8px; color:var(--muted); font-size:13px}
  textarea{min-height:160px; resize:vertical}

  /* FOOTER */
  .site-footer{border-top:1px solid var(--line); background: #0c1017; margin-top: clamp(36px, 6vw, 60px)}
  .footer-top{padding: 40px 0; display:grid; gap:22px; grid-template-columns: 2fr 1fr 1fr}
  .footer-brand{display:flex; gap:12px; align-items:center; font-weight:800; letter-spacing:.3px; margin-bottom:6px}
  .footer-desc{color:var(--muted); max-width:60ch; margin:0}
  .footer-col h4{margin:0 0 10px; font-size:var(--h3)}
  .footer-list{list-style:none; padding:0; margin:0; display:grid; gap:8px}
  .footer-link{opacity:.9; padding:6px 0; border-bottom:1px solid transparent}
  .footer-link:hover{opacity:1; border-bottom-color:rgba(255,255,255,.12)}
  .socials{display:flex; gap:10px; margin-top:10px}
  .social-btn{width:38px; height:38px; display:grid; place-items:center; border:1px solid var(--line); border-radius:12px; background:rgba(255,255,255,.03)}
  .footer-bottom{border-top:1px solid var(--line); padding: 14px 0; color:var(--muted); font-size:13.5px; display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap}

  /* Responsive */
  @media (max-width: 1024px){
    .grid{grid-template-columns: 1fr 1fr}
    .footer-top{grid-template-columns: 1fr 1fr}
  }
  @media (max-width: 640px){
    .grid{grid-template-columns: 1fr}
    .footer-top{grid-template-columns: 1fr}
    form.contact .row{grid-template-columns:1fr}
  }
  `;

  return (
    <>
      <style>{css}</style>

      <div className="wrap">
        {/* NAV */}
        <nav className="nav">
          <div className="container nav-inner">
            <div className="brand">
              <span className="badge" /> TURSA
            </div>
            <div className="menu">
              <NavLink to="/" end>Portfolio</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>
            </div>
          </div>
        </nav>

        {/* CONTENT */}
        {children}

        {/* FOOTER */}
        <footer className="site-footer">
          <div className="container">
            <div className="footer-top">
              <div>
                <div className="footer-brand">
                  <span className="badge" /> TURSA
                </div>
                <p className="footer-desc">
                  We build useful software & IoT—clean UIs, reliable backends, and hardware that ships.
                </p>
                <div className="socials">
                  <a className="social-btn" href="#" aria-label="GitHub" onClick={(e)=>e.preventDefault()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.7 2 12.4c0 4.55 2.87 8.4 6.84 9.76.5.1.68-.23.68-.5 0-.25-.01-.9-.01-1.77-2.78.63-3.37-1.38-3.37-1.38-.45-1.2-1.1-1.52-1.1-1.52-.9-.63.07-.62.07-.62 1 .08 1.52 1.06 1.52 1.06.89 1.58 2.34 1.12 2.9.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.16-4.56-5.18 0-1.15.39-2.08 1.04-2.82-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.08a9.1 9.1 0 0 1 5 0c1.9-1.36 2.74-1.08 2.74-1.08.55 1.4.2 2.44.1 2.7.64.74 1.03 1.67 1.03 2.82 0 4.03-2.34 4.91-4.57 5.17.36.32.68.95.68 1.93 0 1.39-.01 2.5-.01 2.84 0 .28.18.61.69.5A10.13 10.13 0 0 0 22 12.4C22 6.7 17.52 2 12 2Z" fill="currentColor"/></svg>
                  </a>
                  <a className="social-btn" href="#" aria-label="Twitter/X" onClick={(e)=>e.preventDefault()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M18.25 3h3.02l-6.6 7.54L22 21h-6.2l-4.85-6.32L5.47 21H2.45l7.08-8.1L2 3h6.3l4.38 5.77L18.25 3Zm-1.08 16.2h1.67L7.92 4.7H6.16l11.01 14.5Z" fill="currentColor"/></svg>
                  </a>
                  <a className="social-btn" href="#" aria-label="LinkedIn" onClick={(e)=>e.preventDefault()}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.94 8.76H4V20h2.94V8.76ZM5.47 7.42a1.7 1.7 0 1 0 0-3.41 1.7 1.7 0 0 0 0 3.41ZM20 20h-2.93v-5.53c0-1.32-.02-3.01-1.83-3.01-1.83 0-2.11 1.43-2.11 2.9V20H10.2V8.76h2.81v1.53h.04c.39-.74 1.35-1.53 2.78-1.53 2.98 0 3.53 1.96 3.53 4.51V20Z" fill="currentColor"/></svg>
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

              <div className="footer-col">
                <h4>Resources</h4>
                <ul className="footer-list">
                  <li><a className="footer-link" href="#" onClick={(e)=>e.preventDefault()}>Case studies</a></li>
                  <li><a className="footer-link" href="#" onClick={(e)=>e.preventDefault()}>Docs</a></li>
                  <li><a className="footer-link" href="#" onClick={(e)=>e.preventDefault()}>Privacy</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <span>© {new Date().getFullYear()} TURSA. All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ===============================
   Portfolio (Home)
================================= */
function PortfolioPage(): React.ReactElement {
  const projects: Project[] = [
    {
      id: "gridkeys",
      name: "GridKeys",
      tag: "Hardware • Web Configurator",
      coverText: "GridKeys",
      cover: keyboardImg, // image shows via <img />
      blurb:
        "Modular, customizable keyboard platform with a drag-and-drop layout builder and QMK/VIA firmware integration.",
      details:
        "We’re building a grid-based, hot-swappable keyboard system. Users design their layout online, pick plates/switches, and we manufacture in small batches. Tech: React/Node configurator, Spring Boot backend, Firebase + S3, QMK firmware tooling.",
    },
    {
      id: "petpal",
      name: "PetPal",
      tag: "Mobile • Healthcare",
      coverText: "PetPal",
      cover: "",
      blurb: "Integrated pet wellness & tracking platform.",
      details:
        "React Native app for pet owners; Spring Boot microservices for vets and shelters; ESP32 GPS collar prototype; Firebase + Firestore; appointment & symptom tracking; ML roadmap for anomaly detection.",
    },
    {
      id: "medi-bridge",
      name: "MediBridge",
      tag: "Web • Social Impact",
      coverText: "MediBridge",
      cover: "",
      blurb: "Donor–hospital matching platform.",
      details:
        "Next.js + Supabase stack; matching engine for urgent requests; messaging and verification workflow; analytics dashboard for NGO partners.",
    },
    {
      id: "smart-cart",
      name: "Smart Cart",
      tag: "IoT • Retail",
      coverText: "Smart Cart",
      cover: "",
      blurb: "RFID-based smart shopping cart.",
      details:
        "Raspberry Pi + multiple antennas for RSSI trilateration; Spring Boot + Firebase backend; React dashboard; QR-based checkout and discounts; data warehouse for item analytics.",
    },
    {
      id: "tuition-app",
      name: "Tuition Manager",
      tag: "Android • EdTech",
      coverText: "Tuition",
      cover: "",
      blurb: "Student app for assignments, results, attendance.",
      details:
        "Firebase auth & Firestore; role-based dashboards; QR attendance; file uploads via Gofile API; teacher/admin workflows and approvals.",
    },
  ];

  return (
    <main className="section">
      <div className="container">
        <h1 className="title">Featured Projects</h1>
        <p className="lead">A snapshot of what our team at TURSA is building. Tap a tile to expand for more details.</p>

        <FeaturedProject project={projects[0]} />

        <div className="section" style={{ paddingTop: 32 }}>
          <div className="grid">
            {projects.slice(1).map((p) => (
              <ProjectTile key={p.id} project={p} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

function FeaturedProject({ project }: { project: Project }): React.ReactElement {
  return (
    <article className="featured" style={{ marginTop: 18 }}>
      <div className="featured-visual">
        <div className="img">{project.coverText || project.name}</div>
      </div>
      <div className="featured-info">
        <div>
          <div className="chip">{project.tag}</div>
          <h2 style={{ margin: "6px 0 4px", fontSize: "var(--h2)" }}>{project.name}</h2>
          <p className="muted" style={{ margin: 0 }}>{project.blurb}</p>
        </div>
        <a className="btn" href="#" onClick={(e) => e.preventDefault()}>
          View case study
        </a>
      </div>
    </article>
  );
}

function ProjectTile({ project }: { project: Project }): React.ReactElement {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <article className="tile">
      <div
        className="tile-head"
        role="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="tile-media">
          {project.cover ? (
            <img src={project.cover} alt={project.name} />
          ) : (
            <div className="tile-fallback">
              {project.coverText || project.name}
            </div>
          )}
          <span className="tile-name">{project.name}</span>
        </div>
      </div>
      <div className="tile-body">
        <div className="muted">{project.tag}</div>
        <div>{project.blurb}</div>
        <button className="expand-btn" onClick={() => setOpen((v) => !v)}>
          {open ? "Hide details" : "More details"}
        </button>
        {open && (
          <div className="expand">
            <p className="muted" style={{ margin: "0 0 8px" }}>
              {project.details}
            </p>
            <ul style={{ margin: "0 0 6px 18px" }}>
              <li>Tech stack highlights</li>
              <li>Links to repo / demo (add yours)</li>
              <li>Key outcomes &amp; metrics</li>
            </ul>
          </div>
        )}
      </div>
    </article>
  );
}

/* ===============================
   About
================================= */
function AboutPage(): React.ReactElement {
  return (
    <main className="section">
      <div className="container">
        <span className="chip">About us</span>
        <h1 className="title">TURSA — building software &amp; IoT that ship</h1>
        <p className="lead about-intro">
          We’re a team of five engineers and builders who enjoy turning ambitious
          ideas into shipped products—from modular keyboards to retail IoT and pet
          wellness platforms. We design for reliability, explainability, and delightful UX.
        </p>

        <div className="about-grid">
          <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18}}>
            <div style={{background:"var(--surface)", border:"1px solid var(--line)", borderRadius:"16px", padding:"18px"}}>
              <h3 style={{margin:"0 0 6px", fontSize:"var(--h3)"}}>What we do</h3>
              <p className="muted" style={{margin:0}}>
                Full-stack product development across web, mobile, firmware, and light ML. We love typed APIs,
                small services, and clean UIs.
              </p>
            </div>
            <div style={{background:"var(--surface)", border:"1px solid var(--line)", borderRadius:"16px", padding:"18px"}}>
              <h3 style={{margin:"0 0 6px", fontSize:"var(--h3)"}}>How we work</h3>
              <p className="muted" style={{margin:0}}>
                Short iterations, demo-driven, strong docs. We prototype quickly, validate early, and optimize later.
              </p>
            </div>
            <div style={{background:"var(--surface)", border:"1px solid var(--line)", borderRadius:"16px", padding:"18px"}}>
              <h3 style={{margin:"0 0 6px", fontSize:"var(--h3)"}}>Tech</h3>
              <p className="muted" style={{margin:0}}>
                React/Next.js, Spring Boot, Firebase/Supabase, Raspberry Pi/ESP32, QMK, Python data/ETL, and pragmatic cloud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// ===============================
//   Contact
// ===============================
function ContactPage(): React.ReactElement {
  return (
    <main className="section">
      <div className="container">
        <span className="chip">Contact</span>
        <h1 className="title">Get in touch</h1>
        <p className="lead">
          Interested in working with TURSA or have a question? Fill out the form below and we’ll get back to you soon.
        </p>
        <form className="contact" style={{marginTop: 28}}>
          <div className="group row">
            <div>
              <label htmlFor="name">Name</label>
              <input id="name" type="text" style={{width:"100%", padding:"10px", borderRadius:"8px", border:"1px solid var(--line)"}} />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" style={{width:"100%", padding:"10px", borderRadius:"8px", border:"1px solid var(--line)"}} />
            </div>
          </div>
          <div className="group">
            <label htmlFor="message">Message</label>
            <textarea id="message" style={{width:"100%", padding:"10px", borderRadius:"8px", border:"1px solid var(--line)"}} />
          </div>
          <button className="btn" type="submit" style={{marginTop: 10}}>Send</button>
        </form>
      </div>
    </main>
  );
}
