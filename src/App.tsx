import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";

type IconName =
  | "arrow"
  | "download"
  | "copy"
  | "check"
  | "github"
  | "linkedin"
  | "external"
  | "top"
  | "mail"
  | "eye"
  | "close"
  | "spark";

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14M14 7l5 5-5 5" />
      </>
    ),
    download: (
      <>
        <path d="M12 3v12m0 0 4-4m-4 4-4-4M5 20h14" />
      </>
    ),
    copy: (
      <>
        <rect x="8" y="8" width="11" height="11" rx="2" />
        <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    github: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 1.8a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4" />
        <path d="M8 19c-3 .9-3-1.5-4-2" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
        <path d="M2 9h4v12H2z" />
        <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
      </>
    ),
    external: (
      <>
        <path d="M14 5h5v5M10 14l9-9" />
        <path d="M19 13v6H5V5h6" />
      </>
    ),
    top: (
      <>
        <path d="m6 11 6-6 6 6M12 5v14" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    close: (
      <>
        <path d="M18 6 6 18M6 6l12 12" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.9 5.8a2 2 0 0 0 1.3 1.3L21 12l-5.8 1.9a2 2 0 0 0-1.3 1.3L12 21l-1.9-5.8a2 2 0 0 0-1.3-1.3L3 12l5.8-1.9a2 2 0 0 0 1.3-1.3L12 3Z" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function usePointerTilt(max = 5) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    event.currentTarget.style.setProperty("--rx", `${-y * max * 2}deg`);
    event.currentTarget.style.setProperty("--ry", `${x * max * 2}deg`);
    event.currentTarget.style.setProperty("--mx", `${(x + 0.5) * 100}%`);
    event.currentTarget.style.setProperty("--my", `${(y + 0.5) * 100}%`);
  };
  const leave = (event: MouseEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--rx", "0deg");
    event.currentTarget.style.setProperty("--ry", "0deg");
  };
  return { ref, onMouseMove: move, onMouseLeave: leave };
}

function MagneticLink({
  href,
  children,
  secondary = false,
  download = false,
  onClick,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  download?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * 0.12;
    const y = (event.clientY - box.top - box.height / 2) * 0.15;
    event.currentTarget.style.transform = `translate(${x}px,${y}px)`;
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };
  return (
    <a
      ref={ref}
      className={`button ${secondary ? "button-secondary" : ""}`}
      href={href}
      download={download}
      onClick={onClick}
      onMouseMove={move}
      onMouseLeave={leave}
    >
      {children}
    </a>
  );
}

function Portrait({
  square = false,
  src = "/portrait.jpg",
  alt = "Portrait of Nguyễn Thế Vinh",
}: {
  square?: boolean;
  src?: string;
  alt?: string;
}) {
  const tilt = usePointerTilt(5);
  return (
    <div className={`portrait-wrap ${square ? "portrait-square" : ""}`} {...tilt}>
      <div className="portrait-offset" />
      <div className="portrait-media">
        <img
          src={src}
          alt={alt}
          className="portrait-img"
          loading={square ? "lazy" : "eager"}
        />
        <div className="portrait-grain" />
      </div>
    </div>
  );
}

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

const skills = [
  "React.js",
  "Next.js",
  "Node.js",
  "Express.js",
  "MongoDB",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "C++",
  "Java",
  "Git/GitHub",
  "Postman",
];

function handleThumbnailFallback(
  event: SyntheticEvent<HTMLImageElement>,
  baseName: string,
) {
  const img = event.currentTarget;
  const attempt = Number(img.dataset.attempt || "0");
  const candidates = [
    `/${baseName}.png`,
    `/${baseName}.webp`,
    `/${baseName}.jpeg`,
    `/${baseName}`,
  ];
  if (attempt < candidates.length) {
    img.dataset.attempt = String(attempt + 1);
    img.src = candidates[attempt];
  }
}

function ProjectVisual({ type }: { type: "lms" | "kiosk" | "next" }) {
  if (type === "lms") {
    return (
      <div className="project-visual thumb-visual">
        <div className="thumb-window">
          <div className="thumb-bar">
            <span className="thumb-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="thumb-url">english-lms-one.vercel.app</span>
            <span className="thumb-badge">PRODUCTION</span>
          </div>
          <div className="thumb-viewport">
            <img
              src="/english-lms-thumbnail.jpg"
              alt="English LMS platform preview"
              className="thumb-img"
              loading="lazy"
              onError={(e) => handleThumbnailFallback(e, "english-lms-thumbnail")}
            />
            <div className="thumb-shine" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "kiosk") {
    return (
      <div className="project-visual thumb-visual">
        <div className="thumb-window">
          <div className="thumb-bar">
            <span className="thumb-dots">
              <i />
              <i />
              <i />
            </span>
            <span className="thumb-url">kiosk-pos · in-store ordering</span>
            <span className="thumb-badge">POS / KIOSK</span>
          </div>
          <div className="thumb-viewport">
            <img
              src="/kiosk-thumbnail.jpg"
              alt="Self-Order Kiosk application preview"
              className="thumb-img"
              loading="lazy"
              onError={(e) => handleThumbnailFallback(e, "kiosk-thumbnail")}
            />
            <div className="thumb-shine" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual next-visual">
      <div className="next-grid-bg" aria-hidden="true" />
      <div className="next-glow" aria-hidden="true" />
      <div className="next-top">
        <span className="next-status">
          <i /> R&amp;D LAB · SLOT 03
        </span>
        <span className="next-coord">21.0285° N · HN</span>
      </div>

      <div className="next-center">
        <div className="next-eyebrow">
          <Icon name="spark" size={14} />
          <span>INCUBATING ARCHITECTURE</span>
        </div>
        <h4>Next big things...</h4>
        <p>Reserved for the next high-impact product currently in design &amp; prototyping.</p>
      </div>

      <div className="next-pipeline">
        <div className="pipeline-row">
          <span className="pipeline-code">01</span>
          <span className="pipeline-name">AI-Native Web Workflows</span>
          <em className="pipeline-tag active">PROTOTYPING</em>
        </div>
        <div className="pipeline-row">
          <span className="pipeline-code">02</span>
          <span className="pipeline-name">Realtime Collaborative Systems</span>
          <em className="pipeline-tag">ARCHITECTURE</em>
        </div>
        <div className="pipeline-row">
          <span className="pipeline-code">03</span>
          <span className="pipeline-name">High-Craft UI Engineering</span>
          <em className="pipeline-tag">ONGOING</em>
        </div>
      </div>
    </div>
  );
}

type ProjectProps = {
  index: string;
  title: string;
  description: string;
  tags: string[];
  type: "lms" | "kiosk" | "next";
  className?: string;
  live?: string;
  github?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

function ProjectCard({
  index,
  title,
  description,
  tags,
  type,
  className = "",
  live,
  github,
  ctaLabel,
  ctaHref,
}: ProjectProps) {
  const tilt = usePointerTilt(6);
  const isNext = type === "next";

  return (
    <article
      className={`project-card glass spotlight ${isNext ? "project-card-next" : ""} ${className}`}
      {...tilt}
    >
      <div className="project-art">
        <ProjectVisual type={type} />
      </div>
      <div className="project-copy">
        <span className="project-index">
          {index} / 03 {isNext ? "· IN THE PIPELINE" : ""}
        </span>
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tag-row">
          {tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
        <div className="project-links">
          {live && (
            <a href={live} target="_blank" rel="noreferrer">
              Live demo <Icon name="external" size={15} />
            </a>
          )}
          {github && (
            <a href={github} target="_blank" rel="noreferrer">
              GitHub <Icon name="github" size={15} />
            </a>
          )}
          {ctaHref && ctaLabel && (
            <a href={ctaHref} className="next-cta-link">
              {ctaLabel} <Icon name="arrow" size={15} />
            </a>
          )}
        </div>
        <div className="case-link">
          {isNext ? "Pitch a problem or collaborate" : "Explore project details"}{" "}
          <Icon name="arrow" size={17} />
        </div>
      </div>
    </article>
  );
}

function ContributionMap() {
  const levels = [
    0, 1, 0, 2, 0, 0, 1, 0, 2, 1, 0, 3, 1, 0, 1, 1, 2, 0, 2, 3, 1, 0, 2, 3, 1, 4, 2, 0, 1, 3, 2, 4,
    3, 1, 1, 0, 1, 4, 3, 2, 2, 0, 2, 3, 1, 4, 2, 3, 1, 0, 2, 3, 2, 4, 1, 0, 1, 3, 2, 3, 1, 2, 1, 0,
    1, 2, 4, 3, 1, 0, 1, 2, 4, 3, 2, 2, 1, 0, 3, 2, 1, 3, 1, 0,
  ];
  return (
    <div className="heatmap" aria-label="Decorative GitHub contribution heatmap">
      {levels.map((level, i) => (
        <i key={i} data-level={level} />
      ))}
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("work");
  const [copied, setCopied] = useState(false);
  const [cvOpen, setCvOpen] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const reveals = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const sections = document.querySelectorAll("main section[id]");
    const sectionObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-35% 0px -55%" },
    );
    sections.forEach((el) => sectionObserver.observe(el));

    const moveCursor = (event: PointerEvent) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      cursorRef.current.classList.add("cursor-visible");
    };
    const updateCursor = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      cursorRef.current?.classList.toggle(
        "cursor-active",
        Boolean(target.closest("a, button, .project-card, .portrait-wrap")),
      );
    };
    const hideCursor = () => cursorRef.current?.classList.remove("cursor-visible");
    window.addEventListener("pointermove", moveCursor, { passive: true });
    document.addEventListener("pointerover", updateCursor);
    document.documentElement.addEventListener("mouseleave", hideCursor);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", moveCursor);
      document.removeEventListener("pointerover", updateCursor);
      document.documentElement.removeEventListener("mouseleave", hideCursor);
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!cvOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCvOpen(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [cvOpen]);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("ntv2609@gmail.com");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const openCvPreview = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setCvOpen(true);
  };

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <i className="blob blob-a" />
        <i className="blob blob-b" />
        <i className="blob blob-c" />
      </div>
      <div className="film-grain" aria-hidden="true" />
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <header className={`nav-wrap ${scrolled ? "nav-scrolled" : ""}`}>
        <nav className="glass" aria-label="Main navigation">
          <a className="logo" href="#top" aria-label="Nguyễn Thế Vinh, home">
            NTV<span>.</span>
          </a>
          <div className="nav-links">
            {["work", "about", "contact"].map((item) => (
              <a key={item} className={active === item ? "active" : ""} href={`#${item}`}>
                {item[0].toUpperCase() + item.slice(1)}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="mailto:ntv2609@gmail.com">
            Hire me <Icon name="arrow" size={15} />
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero page-shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow">
              <span />
              <span>Intern / Fresher Web Developer</span>
            </div>
            <h1
              id="hero-title"
              className="hero-title"
              aria-label="Fullstack student who ships real products"
            >
              <span className="line">
                <span>Fullstack student</span>
              </span>
              <span className="line">
                <span>who ships real</span>
              </span>
              <span className="line">
                <span>
                  <em>products.</em>
                </span>
              </span>
            </h1>
            <p className="hero-summary">
              Final-year Software Engineering student building clear, maintainable web products
              across frontend and backend.
            </p>
            <div className="hero-actions">
              <MagneticLink href="#work">
                View work <Icon name="arrow" />
              </MagneticLink>
              <MagneticLink href="/resume.pdf" secondary onClick={openCvPreview}>
                Download CV <Icon name="eye" />
              </MagneticLink>
            </div>
            <div className="hero-meta">
              <span>BASED IN HÀ NỘI</span>
              <span>FINAL-YEAR @ HAUI</span>
              <span>GMT+7</span>
            </div>
          </div>

          <div className="hero-media">
            <div className="hero-photo">
              <Portrait src="/portrait.jpg" alt="Portrait of Nguyễn Thế Vinh" />
            </div>
            <div className="photo-chip chip-location glass">Hà Nội · GMT+7</div>
            <div className="photo-chip chip-open glass">
              <i /> Open to internship
            </div>
            <div className="photo-chip chip-school glass">Final-year @ HaUI</div>
            <div className="terminal-card glass">
              <div className="terminal-head">
                <span>
                  <i />
                  <i />
                  <i />
                </span>
                <b>vinh@portfolio:~</b>
              </div>
              <div className="terminal-body">
                <p>
                  <span>$</span> whoami
                </p>
                <small>nguyen-the-vinh</small>
                <p>
                  <span>$</span> ls projects/
                </p>
                <small>lms&nbsp; kiosk&nbsp; next-big-things/</small>
                <p>
                  <span>$</span> git log --oneline
                </p>
                <small>
                  <b>d4ff3a</b> ship useful things
                  <span className="caret" />
                </small>
              </div>
            </div>
          </div>
          <div className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <i />
          </div>
        </section>

        <div className="marquee" aria-label={`Technologies: ${skills.join(", ")}`}>
          <div className="marquee-track">
            {[...skills, ...skills].map((skill, i) => (
              <span key={`${skill}-${i}`}>
                {skill}
                <i />
              </span>
            ))}
          </div>
        </div>

        <section id="work" className="work-section page-shell">
          <Reveal className="section-heading">
            <div>
              <span className="kicker">01 / SELECTED WORK</span>
              <h2>
                Built to solve,
                <br />
                <em>not to decorate.</em>
              </h2>
            </div>
            <p>
              Real-world products and ongoing engineering experiments, shaped from system
              architecture down to the final interaction.
            </p>
          </Reveal>
          <div className="project-grid">
            <Reveal className="project-featured">
              <ProjectCard
                index="01"
                title="English LMS"
                type="lms"
                className="featured"
                description="A scalable, secure learning management system for English language centers, built with a MERN foundation, Next.js, real-time features, and advanced caching."
                tags={["MERN stack", "Next.js", "Socket.io", "Advanced caching"]}
                live="https://english-lms-one.vercel.app"
                github="https://github.com/ntv2609/english-lms"
              />
            </Reveal>
            <Reveal className="project-kiosk">
              <ProjectCard
                index="02"
                title="Self-Order Kiosk"
                type="kiosk"
                description="A full-stack food order kiosk & POS system refactored for fast in-store ordering, featuring guest and member flows, MoMo QR payment, an admin sales dashboard, and Postman-verified REST APIs."
                tags={["React.js", "Node.js", "Express.js", "MongoDB", "MoMo API"]}
                live="https://food-order-kiosk-project.vercel.app"
                github="https://github.com/ntv2609/Food-Order-Kiosk-Project"
              />
            </Reveal>
            <Reveal className="project-shop">
              <ProjectCard
                index="03"
                title="Next big things..."
                type="next"
                description="An open slot in my engineering lab. I’m currently prototyping AI-assisted workflows, real-time web architecture, and high-craft interactive interfaces. Have a bold idea or tough problem? Let’s build it."
                tags={["System Design", "Next.js", "AI Integration", "Open to Collab"]}
                ctaLabel="Collaborate with me"
                ctaHref="#contact"
                github="https://github.com/ntv2609"
              />
            </Reveal>
          </div>
        </section>

        <section id="about" className="about-section page-shell">
          <Reveal className="section-heading about-heading">
            <div>
              <span className="kicker">02 / ABOUT & SKILLS</span>
              <h2>
                Curious by habit.
                <br />
                <em>Practical by choice.</em>
              </h2>
            </div>
          </Reveal>
          <div className="bento">
            <Reveal className="bento-about glass spotlight">
              <div className="about-photo">
                <Portrait
                  square
                  src="/portrait2.jpg"
                  alt="Nguyễn Thế Vinh working and everyday portrait"
                />
              </div>
              <div className="about-copy">
                <span className="tile-label">WHO I AM</span>
                <h3>I learn by making systems work better.</h3>
                <p>
                  I’m a self-driven web developer and final-year Software Engineering student at
                  HaUI. I like solving concrete problems: refactoring systems, integrating
                  third-party APIs, and polishing UI/UX until it feels obvious. I’m looking for an
                  internship where I can contribute carefully, ask better questions, and grow with a
                  strong team.
                </p>
                <a href="#contact">
                  Start a conversation <Icon name="arrow" size={16} />
                </a>
              </div>
            </Reveal>
            <Reveal className="bento-skills glass spotlight">
              <span className="tile-label">TECHNICAL INDEX</span>
              <div className="skill-groups">
                <div>
                  <b>WEB</b>
                  <p>
                    React.js · Next.js
                    <br />
                    Node.js · Express.js
                    <br />
                    MongoDB · Tailwind CSS
                    <br />
                    REST APIs · Socket.io
                  </p>
                </div>
                <div>
                  <b>LANGUAGES</b>
                  <p>
                    JavaScript · TypeScript
                    <br />
                    C++ · Java
                    <br />
                    HTML5 · CSS3
                  </p>
                </div>
                <div>
                  <b>TOOLS</b>
                  <p>
                    Git / GitHub
                    <br />
                    Postman · Figma
                    <br />
                    Vercel · Render
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal className="bento-github glass spotlight">
              <div className="tile-top">
                <span className="tile-label">GITHUB ACTIVITY</span>
                <Icon name="github" />
              </div>
              <ContributionMap />
              <a href="https://github.com/ntv2609" target="_blank" rel="noreferrer">
                @ntv2609 <Icon name="external" size={15} />
              </a>
            </Reveal>
            <Reveal className="bento-education glass spotlight">
              <span className="tile-label">EDUCATION</span>
              <div>
                <small>2023 — PRESENT</small>
                <h3>Software Engineering</h3>
                <p>Hanoi University of Industry</p>
              </div>
            </Reveal>
            <Reveal className="bento-languages glass spotlight">
              <span className="tile-label">LANGUAGES</span>
              <div>
                <b>EN</b>
                <p>Comfortable with technical documentation</p>
              </div>
              <div>
                <b>ZH</b>
                <p>HSK 3 in progress</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="contact-section page-shell">
          <Reveal className="contact-card glass spotlight">
            <div className="contact-status">
              <i />
              <span>AVAILABLE FOR INTERNSHIP</span>
              <b>HÀ NỘI · GMT+7</b>
            </div>
            <div className="contact-main">
              <span className="kicker">03 / CONTACT</span>
              <h2>
                Let’s build something
                <br />
                <em>worth maintaining.</em>
              </h2>
              <p>Have a role, a project, or a useful problem to solve? My inbox is open.</p>
            </div>
            <div className="email-row">
              <a href="mailto:ntv2609@gmail.com">ntv2609@gmail.com</a>
              <button onClick={copyEmail} aria-label="Copy email address">
                {copied ? <Icon name="check" /> : <Icon name="copy" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
            <div className="contact-links">
              <a href="https://github.com/ntv2609" target="_blank" rel="noreferrer">
                <Icon name="github" />
                GitHub <Icon name="external" size={15} />
              </a>
              <a href="https://linkedin.com/in/ntv2609" target="_blank" rel="noreferrer">
                <Icon name="linkedin" />
                LinkedIn <Icon name="external" size={15} />
              </a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="page-shell">
        <span>© 2026 NGUYỄN THẾ VINH</span>
        <span>DESIGNED & BUILT WITH INTENT</span>
        <a href="#top">
          BACK TO TOP <Icon name="top" size={16} />
        </a>
      </footer>

      {cvOpen && (
        <div
          className="cv-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="CV Preview"
          onClick={() => setCvOpen(false)}
        >
          <div
            className="cv-modal glass"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cv-modal-head">
              <div className="cv-modal-title">
                <span className="cv-dot" />
                <div>
                  <b>NGUYỄN THẾ VINH — RESUME PREVIEW</b>
                  <small>public/resume.pdf</small>
                </div>
              </div>
              <div className="cv-modal-actions">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="cv-btn cv-btn-ghost"
                >
                  Open in new tab <Icon name="external" size={14} />
                </a>
                <a
                  href="/resume.pdf"
                  download="Nguyen-The-Vinh-Resume.pdf"
                  className="cv-btn cv-btn-primary"
                >
                  Download PDF <Icon name="download" size={15} />
                </a>
                <button
                  type="button"
                  className="cv-btn cv-btn-close"
                  onClick={() => setCvOpen(false)}
                  aria-label="Close CV preview"
                >
                  <Icon name="close" size={17} />
                </button>
              </div>
            </div>
            <div className="cv-modal-body">
              <iframe
                src="/resume.pdf#view=FitH"
                title="Nguyễn Thế Vinh Resume PDF"
                className="cv-iframe"
              />
            </div>
          </div>
        </div>
      )}

      <div className={`toast ${copied ? "show" : ""}`} role="status">
        <Icon name="check" size={16} /> Email copied to clipboard
      </div>
    </>
  );
}