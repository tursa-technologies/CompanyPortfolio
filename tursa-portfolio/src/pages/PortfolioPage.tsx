import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./PortfolioPage.css";
import keyboardImg from "../assets/keyboard.jpg";

type Project = {
  id: string;
  name: string;
  tag: string;
  cover?: string;
  blurb: string;
  details: string;
};

const projects: Project[] = [
  {
    id: "gridkeys",
    name: "GridKeys",
    tag: "Hardware • Software Configurator",
    cover: keyboardImg,
    blurb:
      "Modular, customizable keyboard platform with a drag-and-drop layout builder. You choose which keys — and where they go.",
    details:
      "React/Node configurator, Spring Boot backend, Firebase + S3, and QMK tooling. Users design layouts online, pick plates/switches, and we build in small batches with firmware integration.",
  },
  {
    id: "petpal",
    name: "PetPal",
    tag: "Mobile • Healthcare",
    blurb: "Pet wellness & location tracking for owners and vets.",
    details:
      "React Native app, Spring Boot microservices, ESP32 GPS collar prototype, appointment/symptom logs, and secure share with clinics.",
  },
  {
    id: "medi-bridge",
    name: "MediBridge",
    tag: "Web • Social Impact",
    blurb: "Donor–hospital matching platform.",
    details:
      "Next.js + Supabase stack with messaging, verification flows, and analytics for NGO partners handling urgent requests.",
  },
  {
    id: "smart-cart",
    name: "Smart Cart",
    tag: "IoT • Retail",
    blurb: "RFID-based shopping cart with instant checkout.",
    details:
      "Raspberry Pi with multi-antenna RSSI, Spring Boot + Firebase backend, React dashboards, QR checkout, couponing, and store analytics.",
  },
];

export default function PortfolioPage(): React.ReactElement {
  const featured = projects[0];
  const others = projects.slice(1);

  const [activeId, setActiveId] = useState<string | null>(null);
  const active = useMemo(
    () => projects.find((p) => p.id === activeId) || null,
    [activeId]
  );

  return (
    <div className="portfolio-page">
      <div className="portfolio-container">
        <header className="portfolio-header">
          <h1 className="portfolio-main-title">Featured Project</h1>
          <p className="portfolio-lead">
            A snapshot of what TURSA is building. Tap a tile to learn more.
          </p>
        </header>

        {/* Featured Project */}
        <button
          className="portfolio-featured"
          onClick={() => setActiveId(featured.id)}
          aria-label={`Open ${featured.name} details`}
        >
          {featured.cover ? (
            <img
              src={featured.cover}
              alt={featured.name}
              className="portfolio-featured-img"
            />
          ) : (
            <div className="portfolio-placeholder portfolio-featured-placeholder">
              {featured.name}
            </div>
          )}
          <div className="portfolio-featured-info">
            <div className="portfolio-featured-content">
              <span className="portfolio-chip">{featured.tag}</span>
              <h2 className="portfolio-featured-title">{featured.name}</h2>
              <p className="portfolio-featured-blurb">{featured.blurb}</p>
            </div>
          </div>
        </button>

        {/* Other Projects */}
        <h2 className="portfolio-section-title">Other Projects</h2>
        <div className="portfolio-grid">
          {others.map((p) => (
            <ProjectTile key={p.id} project={p} onOpen={() => setActiveId(p.id)} />
          ))}
        </div>

        {/* Modal */}
        <ProjectModal project={active} onClose={() => setActiveId(null)} />
      </div>
    </div>
  );
}

interface ProjectTileProps {
  project: Project;
  onOpen: () => void;
}

function ProjectTile({ project, onOpen }: ProjectTileProps): React.ReactElement {
  return (
    <button
      className="portfolio-tile"
      onClick={onOpen}
      aria-label={`Open ${project.name} details`}
    >
      <div className="portfolio-tile-media">
        {project.cover ? (
          <img
            src={project.cover}
            alt={project.name}
            className="portfolio-tile-img"
          />
        ) : (
          <div className="portfolio-placeholder portfolio-tile-placeholder">
            {project.name}
          </div>
        )}
        <div className="portfolio-tile-overlay" />
        <span className="portfolio-tile-name">{project.name}</span>
      </div>
      <div className="portfolio-tile-body">
        <p className="portfolio-tile-tag">{project.tag}</p>
        <p className="portfolio-tile-blurb">{project.blurb}</p>
      </div>
    </button>
  );
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps): React.ReactElement | null {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (project) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    closeBtnRef.current?.focus();

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  if (!project) return null;

  const modal = (
    <div
      className={`portfolio-modal-root ${isVisible ? "visible" : ""}`}
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="portfolio-modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          ref={closeBtnRef}
          className="portfolio-modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        <div className="portfolio-modal-media">
          {project.cover ? (
            <img
              src={project.cover}
              alt={project.name}
              className="portfolio-modal-img"
            />
          ) : (
            <div className="portfolio-placeholder portfolio-modal-placeholder">
              {project.name}
            </div>
          )}
        </div>

        <div className="portfolio-modal-body">
          <span className="portfolio-chip">{project.tag}</span>
          <h3 className="portfolio-modal-title">{project.name}</h3>
          <p className="portfolio-modal-blurb">{project.blurb}</p>
          <div className="portfolio-divider" />
          <p className="portfolio-modal-details">{project.details}</p>

          <div className="portfolio-modal-actions">
            <a
              className="portfolio-btn"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              View case study
            </a>
            <a
              className="portfolio-btn-outline"
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Visit repo
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}