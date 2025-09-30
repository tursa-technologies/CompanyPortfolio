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
    tag: "Hardware • Web Configurator",
    cover: keyboardImg,
    blurb: "Modular, customizable keyboard platform with drag-and-drop layout builder.",
    details: "React/Node configurator, Spring Boot backend, Firebase + S3, QMK tooling."
  },
  {
    id: "petpal",
    name: "PetPal",
    tag: "Mobile • Healthcare",
    blurb: "Integrated pet wellness & tracking platform.",
    details: "React Native app + Spring Boot microservices + ESP32 GPS collar."
  },
  {
    id: "medi-bridge",
    name: "MediBridge",
    tag: "Web • Social Impact",
    blurb: "Donor–hospital matching platform.",
    details: "Next.js + Supabase stack + messaging/analytics."
  },
  {
    id: "smart-cart",
    name: "Smart Cart",
    tag: "IoT • Retail",
    blurb: "RFID-based smart shopping cart.",
    details: "Raspberry Pi, Spring Boot + Firebase backend, React dashboard."
  },
];

export default function PortfolioPage() {
  const featured = projects[0];
  const others = projects.slice(1);

  return (
    <div className="section container">
      <header className="page-head">
        <h1 className="title">Featured Project</h1>
        <p className="lead">
          A snapshot of what TURSA is building. Tap a tile to learn more.
        </p>
      </header>

      {/* FEATURED */}
      <article className="featured">
        {featured.cover ? (
          <img src={featured.cover} alt={featured.name} />
        ) : (
          <div className="placeholder">{featured.name}</div>
        )}
        <div className="featured-info">
          <div className="chip">{featured.tag}</div>
          <h2>{featured.name}</h2>
          <p className="muted">{featured.blurb}</p>
        </div>
      </article>

      {/* OTHERS */}
      <h2 className="title space-top">Other Projects</h2>
      <div className="grid">
        {others.map((p) => (
          <ProjectTile key={p.id} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProjectTile({ project }: { project: Project }) {
  return (
    <article className="tile" role="button" tabIndex={0}>
      <div className="tile-media">
        {project.cover ? (
          <img src={project.cover} alt={project.name} />
        ) : (
          <div className="placeholder">{project.name}</div>
        )}
        <span className="tile-name">{project.name}</span>
      </div>
      <div className="tile-body">
        <p className="muted small">{project.tag}</p>
        <p>{project.blurb}</p>
      </div>
    </article>
  );
}
