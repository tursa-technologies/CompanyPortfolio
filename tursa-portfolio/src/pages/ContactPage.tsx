import { useState } from "react";
import "./ContactPage.css";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("https://formspree.io/f/xovkdnvg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="section container">
      <h1 className="title">Contact Us</h1>
      <p className="lead">Have a project in mind or want to collaborate? Send a note.</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="row">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              placeholder="Jane Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="field">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell us a bit about your idea…"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <div className="actions">
          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send"}
          </button>
        </div>

        {status === "success" && <p className="success">Thanks! Your message has been sent 🎉</p>}
        {status === "error" && <p className="error">Oops! Something went wrong. Please try again.</p>}
      </form>
    </div>
  );
}
