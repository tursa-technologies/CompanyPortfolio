import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="section container">
      <h1 className="title">About Us</h1>
      <p className="lead">
        We’re a team of five engineers and builders who enjoy turning ambitious
        ideas into shipped products—from modular keyboards to retail IoT and pet
        wellness platforms.
      </p>

      <div className="about-grid">
        <div className="card">
          <h3>What we do</h3>
          <p className="muted">
            Full-stack product development across web, mobile, firmware, and light ML.
          </p>
        </div>
        <div className="card">
          <h3>How we work</h3>
          <p className="muted">
            Short iterations, demo-driven, strong docs. Prototype quickly, validate early.
          </p>
        </div>
        <div className="card">
          <h3>Tech</h3>
          <p className="muted">
            React/Next.js, Spring Boot, Firebase/Supabase, Raspberry Pi/ESP32, QMK, Python.
          </p>
        </div>
      </div>
    </div>
  );
}
