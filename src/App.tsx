import { useState, useEffect } from "react";

//Types
interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  repo?: string;
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface Education {
  degree: string;
  institution: string;
  period: string;
  current?: boolean;
}

//Data
const PROJECTS: Project[] = [
  {
    title: "Asistente Virtual — Colegio San José",
    description:
      "Chatbot con IA integrada (Google Gemini 2.5 Flash) para la secretaría del colegio. Permite consultar horarios, fechas de exámenes y realizar trámites administrativos con derivación a humano.",
    tags: ["React", "Vite", "Tailwind CSS", "Gemini API", "JavaScript"],
    repo: "https://github.com/facudev04/Asistente-Virtual",
    link: "https://facudev04.github.io/Asistente-Virtual/",
  },
  {
    title: "CineSearch",
    description:
      "App web para entusiastas del cine con búsqueda en tiempo real, tendencias globales y vista inmersiva por película usando la API de TMDB. Estética oscura con diseño cinematográfico.",
    tags: ["React 19", "Vite", "Tailwind CSS", "TMDB API", "JavaScript"],
    repo: "https://github.com/facudev04/CineSearch",
    link: "https://facudev04.github.io/CineSearch/",
  },
  {
    title: "Temply",
    description:
      "Aplicación web que muestra el clima en tiempo real de cualquier país o ciudad del mundo, consumiendo una API meteorológica con interfaz limpia y responsiva.",
    tags: ["JavaScript", "Weather API", "HTML", "CSS"],
    repo: "https://github.com/facudev04/Temply",
    link: "https://facudev04.github.io/MyAdmin/"
  },
  {
    title: "MyAdmin",
    description:
      "Administrador de tareas con calendario interactivo para organizar actividades mensuales. Interfaz intuitiva con vistas personalizables.",
    tags: ["CSS", "JavaScript", "HTML"],
    repo: "https://github.com/facudev04/MyAdmin",
    link: "https://facudev04.github.io/MyAdmin/"
  },
];

const SKILLS: SkillGroup[] = [
  {
    category: "Lenguajes",
    items: ["JavaScript", "TypeScript", "C++", "PHP", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    items: ["React", "Bootstrap", "Tailwind CSS"],
  },
  {
    category: "Backend & DB",
    items: ["Node.js", "MySQL", "REST APIs"],
  },
  {
    category: "Herramientas",
    items: ["Git", "GitHub", "Photoshop", "Figma", "Postman"],
  },
];

const EDUCATION: Education[] = [
  {
    degree: "Ingeniería en Sistemas",
    institution: "Universidad de la Marina Mercante",
    period: "2025 — Actualidad",
    current: true,
  },
  {
    degree: "Diseñador UX/UI",
    institution: "Coder House",
    period: "2024 — 2025",
  },
  {
    degree: "Técnico en Programación",
    institution: 'EEST N°4 "Prof. Ricardo Alberto López"',
    period: "2017 — 2023",
  },
];

//Cursor glow
function CursorGlow() {
  const [pos, setPos] = useState({ x: -400, y: -400 });
  useEffect(() => {
    const h = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);
  return (
    <div
      className="cursor-glow"
      style={{ left: pos.x - 300, top: pos.y - 300 }}
    />
  );
}

//Typewriter
function Typewriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const speed = deleting ? 40 : 80;
    const timeout = setTimeout(() => {
      if (!deleting && displayed === current) {
        setTimeout(() => setDeleting(true), 1800);
        return;
      }
      if (deleting && displayed === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
        return;
      }
      setDisplayed((d) =>
        deleting ? d.slice(0, -1) : current.slice(0, d.length + 1)
      );
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts]);

  return (
    <span className="typewriter-text">
      {displayed}
      <span className="typewriter-cursor">|</span>
    </span>
  );
}

//Tag
function Tag({ label }: { label: string }) {
  return <span className="tag">{label}</span>;
}

//Section Title
function SectionTitle({ number, title }: { number: string; title: string }) {
  return (
    <div className="section-title">
      <span className="section-title__number">{number}.</span>
      <h2 className="section-title__text">{title}</h2>
      <div className="section-title__line" />
    </div>
  );
}

//Project Card
function ProjectCard({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`project-card ${hovered ? "project-card--hovered" : ""}`}
    >
      <div className="project-card__header">
        <svg className="project-card__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M5 3a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h6M9 13h4" />
        </svg>
        <div className="project-card__links">
          {project.repo && (
            <a href={project.repo} target="_blank" rel="noreferrer"
              className="project-card__link" aria-label="Repositorio">
              <svg className="project-card__link-icon" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
            </a>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer"
              className="project-card__link" aria-label="Demo">
              <svg className="project-card__link-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
        </div>
      </div>
      <h3 className="project-card__title">{project.title}</h3>
      <p className="project-card__description">{project.description}</p>
      <div className="project-card__tags">
        {project.tags.map((t) => <Tag key={t} label={t} />)}
      </div>
    </div>
  );
}

//Theme Toggle
function ThemeToggle({ dark, onToggle }: { dark: boolean; onToggle: () => void }) {
  return (
    <button onClick={onToggle} className="theme-toggle" aria-label="Cambiar tema">
      {dark ? (
        <svg className="theme-toggle__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="theme-toggle__icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  );
}

//App
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    document.documentElement.classList.toggle("light", !dark);
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "bd404f9f-2ab9-4aeb-b0d9-c85a30a45db2",
          subject: `Nuevo mensaje de ${form.name} — Portfolio`,
          from_name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const navLinks = ["sobre-mi", "experiencia", "skills", "proyectos", "contacto"];
  const navLabels: Record<string, string> = {
    "sobre-mi": "Sobre mí",
    experiencia: "Experiencia",
    skills: "Skills",
    proyectos: "Proyectos",
    contacto: "Contacto",
  };

  return (
    <div className="app">
      <CursorGlow />

      {/* Navbar */}
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <button onClick={() => scrollTo("hero")} className="navbar__logo">
            FG<span className="navbar__logo-dot">;</span>
          </button>

          <nav className="navbar__links">
            {navLinks.map((id, i) => (
              <button key={id} onClick={() => scrollTo(id)} className="navbar__link">
                <span className="navbar__link-number">{String(i + 1).padStart(2, "0")}.</span>
                {navLabels[id]}
              </button>
            ))}
            <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
            
          </nav>

          <div className="navbar__burger-group">
            <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />
            <button className="navbar__burger" onClick={() => setMenuOpen((o) => !o)}>
              <span className={`navbar__burger-line ${menuOpen ? "navbar__burger-line--top-open" : ""}`} />
              <span className={`navbar__burger-line ${menuOpen ? "navbar__burger-line--mid-open" : ""}`} />
              <span className={`navbar__burger-line ${menuOpen ? "navbar__burger-line--bot-open" : ""}`} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="navbar__mobile">
            {navLinks.map((id, i) => (
              <button key={id} onClick={() => scrollTo(id)} className="navbar__mobile-link">
                <span className="navbar__link-number">{String(i + 1).padStart(2, "0")}.</span>
                {navLabels[id]}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="hero" className="hero">
        <div className="hero__grid" />
        <p className="hero__intro">Hola, mi nombre es</p>
        <h1 className="hero__name">Facundo Galeano.</h1>
        <h2 className="hero__role">
          <Typewriter texts={["Desarrollador Web.", "Estudiante de Sistemas.", "Diseñador UX/UI.", "Analista SOC Jr."]} />
        </h2>
        <p className="hero__bio">
          Estudiante de Ingeniería en Sistemas con experiencia en proyectos web.
          Apasionado por construir soluciones digitales desde la interfaz hasta la base de datos.
        </p>
        <div className="hero__actions">
          <button onClick={() => scrollTo("proyectos")} className="hero__btn-primary">
            Ver proyectos →
          </button>
          <a href="mailto:facu.dev2004@gmail.com" className="hero__btn-secondary">
            facu.dev2004@gmail.com
          </a>
        </div>
        <div className="hero__scroll">
          <span className="hero__scroll-label">scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* Sobre mí */}
      <section id="sobre-mi" className="section">
        <SectionTitle number="01" title="Sobre mí" />
        <div className="about__grid">
          <div className="about__bio">
            <p>
              Soy Facundo, tengo 21 años y soy estudiante de{" "}
              <span className="about__highlight">Ingeniería en Sistemas</span> en la
              Universidad de la Marina Mercante. Mi camino en la programación empezó en la
              secundaria técnica, donde me recibí de Técnico en Programación en 2023.
            </p>
            <p>
              Me especializo en el{" "}
              <span className="about__highlight">desarrollo web full stack</span>, con
              experiencia en proyectos reales que van desde aplicaciones de gestión hasta
              plataformas educativas. También completé una formación en{" "}
              <span className="about__highlight">Diseño UX/UI</span> en Coder House,
              lo que me permite pensar tanto en la experiencia del usuario como en la implementación técnica.
            </p>
            <p>
              Actualmente trabajo como{" "}
              <span className="about__highlight--cyan">Analista SOC Jr.</span> en el Comando
              Conjunto de Ciberdefensa, donde me ocupo del monitoreo de seguridad en tiempo real,
              análisis de alertas y respuesta a incidentes.
            </p>
          </div>
          <div className="about__stats">
            {[
              { value: "1", label: "Año de experiencia" },
              { value: "4",  label: "Proyectos web" },
              { value: "UX/UI", label: "Certificación Coder House" },
              { value: "SOC Jr", label: "Ciberdefensa Nacional" },
            ].map(({ value, label }) => (
              <div key={label} className="stat-card">
                <div className="stat-card__value">{value}</div>
                <div className="stat-card__label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiencia & Educación */}
      <section id="experiencia" className="section">
        <SectionTitle number="02" title="Experiencia & Educación" />
        <div className="exp__grid">
          <div>
            <h3 className="timeline__category">Laboral</h3>
            <div className="timeline">
              <div className="timeline__dot timeline__dot--active" />
              <span className="timeline__badge">2025 — Actualidad</span>
              <h4 className="timeline__role">Analista SOC Jr.</h4>
              <p className="timeline__company">Comando Conjunto de Ciberdefensa (CCCD)</p>
              <ul className="timeline__list">
                {[
                  "Monitoreo y detección en tiempo real: gestión de SIEM, análisis de alertas y vigilancia de tráfico",
                  "Clasificación y escalado de incidentes de seguridad",
                  "Respuesta inicial a incidentes y contención",
                  "Reporte y documentación de eventos de seguridad",
                ].map((item) => (
                  <li key={item} className="timeline__item">
                    <span className="timeline__bullet">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="timeline__category">Educación</h3>
            <div className="timeline timeline--spaced">
              {EDUCATION.map((edu) => (
                <div key={edu.degree} className="timeline__entry">
                  <div className={`timeline__dot ${edu.current ? "timeline__dot--active" : "timeline__dot--inactive"}`} />
                  <div className="timeline__meta" style={{ paddingLeft: "0.25rem" }}>
                    <span className="timeline__period">{edu.period}</span>
                    {edu.current && <span className="timeline__badge">Cursando</span>}
                  </div>
                  <h4 className="timeline__degree">{edu.degree}</h4>
                  <p className="timeline__institution">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="section">
        <SectionTitle number="03" title="Skills" />
        <div className="skills__grid">
          {SKILLS.map((group) => (
            <div key={group.category} className="skill-card">
              <h3 className="skill-card__category">{group.category}</h3>
              <ul className="skill-card__list">
                {group.items.map((item) => (
                  <li key={item} className="skill-card__item">
                    <span className="skill-card__dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="section">
        <SectionTitle number="04" title="Proyectos" />
        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="contact">
        <p className="contact__eyebrow">05. ¿Qué sigue?</p>
        <h2 className="contact__title">Hablemos</h2>
        <p className="contact__bio">
          Estoy abierto a nuevas oportunidades, proyectos freelance o simplemente charlar sobre
          tecnología. Completá el formulario y te respondo a la brevedad.
        </p>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-row">
            <div className="contact__field">
              <label className="contact__label">Nombre</label>
              <input
                type="text"
                className="contact__input"
                placeholder="Tu nombre"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>
            <div className="contact__field">
              <label className="contact__label">Email</label>
              <input
                type="email"
                className="contact__input"
                placeholder="tu@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="contact__field">
            <label className="contact__label">Mensaje</label>
            <textarea
              className="contact__textarea"
              placeholder="¿En qué puedo ayudarte?"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>

          {status === "success" && (
            <p className="contact__feedback contact__feedback--success">
              ✓ Mensaje enviado. ¡Gracias por escribirme!
            </p>
          )}
          {status === "error" && (
            <p className="contact__feedback contact__feedback--error">
              ✗ Hubo un error al enviar. Intentá de nuevo.
            </p>
          )}

          <button type="submit" className="contact__submit" disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "Enviar mensaje →"}
          </button>
        </form>

        <div className="contact__socials">
          <a href="https://github.com/facudev04" target="_blank" rel="noreferrer" className="social-icon" aria-label="GitHub">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/facundo-galeano-067946356/" target="_blank" rel="noreferrer" className="social-icon" aria-label="LinkedIn">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"/>
            </svg>
          </a>
          <a href="mailto:facu.dev2004@gmail.com" className="social-icon" aria-label="Email">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        Diseñado y desarrollado por <span className="footer__name">Facundo Galeano</span>
      </footer>

      {/* Sidebar social — desktop */}
      <div className="sidebar-left">
        <a href="https://github.com/facudev04" target="_blank" rel="noreferrer" className="sidebar__icon">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.57v-2.01c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.69.82.57C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/facundo-galeano-067946356/" target="_blank" rel="noreferrer" className="sidebar__icon">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.12 2.06 2.06 0 010 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z"/>
          </svg>
        </a>
        <div className="sidebar__line" />
      </div>

      {/* Sidebar email — desktop */}
      <div className="sidebar-right">
        <a href="mailto:facu.dev2004@gmail.com" className="sidebar__email">
          facu.dev2004@gmail.com
        </a>
        <div className="sidebar__line" />
      </div>
    </div>
  );
}