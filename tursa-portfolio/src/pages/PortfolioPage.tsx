import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import "./PortfolioPage.css";
import keyboardImg from "../assets/keyboard.jpg";
import cartImg from "../assets/shoppingCart.jpg";
import tuitionImg from "../assets/uni.jpg";

type Project = {
  id: string;
  name: string;
  tag: string;
  cover?: string;
  blurb: string;
  details: React.ReactNode;
};

const projects: Project[] = [
    {
        id: "gridkeys",
        name: "GridKeys",
        tag: "Hardware • Software Configurator",
        cover: keyboardImg,
        blurb:
            "Modular, customizable keyboard platform with a drag-and-drop layout builder. You choose which keys — and where they go.",
       details: (
  <div>
    <p>
      GridKeys is a modular and customizable keyboard platform that allows users to
      design and configure their own layouts through an intuitive drag-and-drop
      builder.
    </p>

    <p>
      The platform enables complete personalization, letting users decide which keys
      to include, where to place them, and how their keyboard looks and feels.
    </p>

    <h4>Key Features:</h4>
    <ul>
      <li>Drag-and-drop interface to design keyboard layouts</li>
      <li>Support for modular expansion and custom arrangements</li>
      <li>Option to choose colors, textures, and key styles</li>
      <li>Live preview of user-created configurations</li>
      <li>Seamless integration with backend for saving and managing layouts</li>
    </ul>

    <p>
      GridKeys reflects our vision of merging hardware and software to create a
      personalized typing experience, tailored to each individual’s preferences.
    </p>
  </div>
),
    },
    {
        id: "smart-cart",
        name: "Smart Shopping Cart in Collaboration with Sri Lanka Telecom",
        tag: "IoT • Retail",
        cover: cartImg,
        blurb: "RFID-based shopping cart with instant checkout.",
        details: (
  <div>
    <p>
      We engineered a full-stack Smart Shopping Cart in collaboration with Sri Lanka
      Telecom to digitize and automate the retail shopping experience.
    </p>

    <p>
      The system integrates RFID hardware with Firebase and a Spring Boot backend,
      enabling real-time cart tracking, session-based management, and instant checkout
      through QR-based cart assignment.
    </p>

    <h4>Key Features:</h4>
    <ul>
      <li>Real-time cart tracking with RFID readers and Firebase listeners</li>
      <li>Session-based cart and checkout management</li>
      <li>QR code-based cart assignment and dynamic session handling</li>
      <li>Shopping list generation, item categorization, and smart suggestions</li>
      <li>Admin dashboard for managing carts, items, users, and monitoring activity</li>
      <li>Analytics dashboards for tracking active sessions, cart contents, and trends</li>
      <li>Responsive ReactJS frontend with live updates</li>
      <li>Modular Spring Boot backend with clean REST APIs</li>
    </ul>

    <h4>Tech Stack:</h4>
    <ul>
      <li>4-port RFID reader with 3 dBi and 5 dBi antennas</li>
      <li>Raspberry Pi 4 for edge device integration</li>
      <li>Spring Boot (REST API backend)</li>
      <li>ReactJS frontend</li>
      <li>Firebase Realtime Database + Firestore</li>
      <li>RFID tags for item-level detection</li>
    </ul>

    <p>
      This project highlights our focus on scalability, real-time analytics,
      and reliable system design to deliver a production-ready retail solution.
    </p>
  </div>
),
    },
    {
        id: "tuition-manager",
        name: "Tuition Manager Android Application",
        tag: "Mobile App • Productivity",
        cover: tuitionImg,
        blurb: "Organize and track your tuition classes, students, and payments.",
        details: (
  <div>
    <p>
      We’ve built a full-featured Tuition Management App designed to simplify
      operations for tuition centers and enhance engagement between
      administrators, teachers, students, and parents.
    </p>

    <p>
      One of the core strengths of our app lies in its implementation of the MVC
      (Model-View-Controller) architecture. This helped us separate concerns,
      improve code maintainability, and ensure a scalable and organized
      development process.
    </p>

    <h4>Key Features:</h4>
    <ul>
      <li>Modular teacher dashboard for attendance, assignments, results, and materials</li>
      <li>Student access to assignments, attendance records, and results</li>
      <li>Admin control panel to manage users, assign teachers, and monitor courses</li>
      <li>Assignment upload support (PDFs, images) with cloud-based file hosting</li>
      <li>QR code-based attendance tracking system</li>
      <li>Google Maps integration to locate classes</li>
      <li>Built-in email communication with parents</li>
      <li>Real-time data sync and updates</li>
    </ul>

    <h4>Tech Stack:</h4>
    <ul>
      <li>Android (Java) using Android Studio</li>
      <li>MVC architecture for scalable and maintainable code</li>
      <li>Firebase Firestore for cloud database</li>
      <li>Firebase Authentication for secure login</li>
      <li>GoFile.io API for document uploads</li>
      <li>Google Maps API integration</li>
      <li>Volley library for API/network requests</li>
      <li>Material Design and Navigation Drawer for intuitive UI/UX</li>
    </ul>

    <p>
      This project reflects our team’s commitment to clean architecture,
      practical functionality, and real-world problem solving in the education
      domain.
    </p>
  </div>
),
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
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}