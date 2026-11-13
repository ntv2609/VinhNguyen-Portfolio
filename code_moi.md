# File: .oxlintrc.json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}


# File: index.html
<!doctype html>
<html lang="en">
  <head>
    <!-- figma:head-start -->
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nguyễn Thế Vinh — Web Developer Portfolio</title>
    <!-- figma:head-end -->
  </head>
  <body>
    <!-- figma:body-start -->
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
    <!-- figma:body-end -->
  </body>
</html>


# File: package.json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "format": "oxfmt"
  },
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.0.0",
    "@types/node": "^22.0.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "@vitejs/plugin-react": "^6.0.0",
    "oxfmt": "^0.76.0",
    "tailwindcss": "^4.0.0",
    "typescript": "^5.7.0",
    "vite": "^8.0.5"
  }
}


# File: src/App.css
.counter {
  font-size: 16px;
  padding: 5px 10px;
  border-radius: 5px;
  color: var(--accent);
  background: var(--accent-bg);
  border: 2px solid transparent;
  transition: border-color 0.3s;
  margin-bottom: 24px;

  &:hover {
    border-color: var(--accent-border);
  }
  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
}


# File: src/App.tsx
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
                github="https://github.com/ntv2609/self-order-kiosk"
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


# File: src/index.css
@import url("https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap");
@import "tailwindcss";

:root {
  --ink: #0a0c0f;
  --paper: #edebe4;
  --muted: #9ba0aa;
  --lime: #d4ff3a;
  --line: rgba(255, 255, 255, 0.1);
  --glass: rgba(255, 255, 255, 0.05);
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  color-scheme: dark;
  font-synthesis: none;
}

@layer base {
  html {
    scroll-behavior: smooth;
    background: var(--ink);
  }
  body {
    min-width: 320px;
    margin: 0;
    overflow-x: hidden;
    background: var(--ink);
    color: var(--paper);
    font-family: "Geist", sans-serif;
  }
  button,
  a {
    -webkit-tap-highlight-color: transparent;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  button {
    color: inherit;
  }
  ::selection {
    background: var(--lime);
    color: var(--ink);
  }
  :focus-visible {
    outline: 2px solid var(--lime);
    outline-offset: 4px;
  }
}

* {
  box-sizing: border-box;
}

.page-shell {
  width: min(100% - 64px, 1312px);
  margin-inline: auto;
}
.ambient,
.film-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
}
.ambient {
  overflow: hidden;
  z-index: 0;
}
.film-grain {
  z-index: 50;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
}
.custom-cursor {
  position: fixed;
  z-index: 90;
  left: -5px;
  top: -5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--lime);
  opacity: 0;
  pointer-events: none;
  transform: translate3d(-20px, -20px, 0);
  transition:
    width 400ms var(--ease),
    height 400ms var(--ease),
    left 400ms var(--ease),
    top 400ms var(--ease),
    opacity 250ms ease,
    background 250ms ease;
  will-change: transform;
}
.custom-cursor.cursor-visible {
  opacity: 0.9;
}
.custom-cursor.cursor-active {
  left: -17px;
  top: -17px;
  width: 34px;
  height: 34px;
  background: rgba(212, 255, 58, 0.16);
  border: 1px solid rgba(212, 255, 58, 0.75);
}
.blob {
  position: absolute;
  display: block;
  border-radius: 50%;
  filter: blur(130px);
  opacity: 0.17;
  will-change: transform;
}
.blob-a {
  width: 620px;
  height: 620px;
  background: #0f4c5c;
  left: -170px;
  top: 8%;
  animation: drift-a 36s ease-in-out infinite alternate;
}
.blob-b {
  width: 530px;
  height: 530px;
  background: #b5471b;
  right: -150px;
  top: 31%;
  animation: drift-b 40s ease-in-out infinite alternate;
}
.blob-c {
  width: 460px;
  height: 460px;
  background: #0f4c5c;
  left: 44%;
  bottom: -260px;
  opacity: 0.12;
  animation: drift-c 34s ease-in-out infinite alternate;
}
@keyframes drift-a {
  to {
    transform: translate(170px, 110px) scale(1.08);
  }
}
@keyframes drift-b {
  to {
    transform: translate(-150px, 150px) scale(0.9);
  }
}
@keyframes drift-c {
  to {
    transform: translate(-120px, -180px) scale(1.12);
  }
}

main,
footer,
.nav-wrap {
  position: relative;
  z-index: 2;
}
.glass {
  background:
    linear-gradient(120deg, rgba(255, 255, 255, 0.075), transparent 33%) border-box,
    var(--glass);
  border: 1px solid var(--line);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.08),
    0 22px 60px rgba(0, 0, 0, 0.28),
    0 2px 8px rgba(0, 0, 0, 0.24);
  backdrop-filter: blur(24px) saturate(140%);
  -webkit-backdrop-filter: blur(24px) saturate(140%);
}
.spotlight {
  position: relative;
  overflow: hidden;
}
.spotlight::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    360px circle at var(--mx, 50%) var(--my, 50%),
    rgba(255, 255, 255, 0.1),
    transparent 65%
  );
  transition: opacity 500ms var(--ease);
}
.spotlight:hover::after {
  opacity: 1;
}
.eyebrow,
.kicker,
.tile-label,
.hero-meta,
footer {
  font-family: "JetBrains Mono", monospace;
  letter-spacing: 0.11em;
  font-size: 11px;
}
.kicker,
.tile-label {
  color: var(--lime);
}

.nav-wrap {
  position: fixed;
  z-index: 40;
  top: 24px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding-inline: 16px;
  transition: top 600ms var(--ease);
}
.nav-wrap nav {
  width: min(736px, 100%);
  height: 68px;
  padding: 8px 10px 8px 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition:
    height 600ms var(--ease),
    width 600ms var(--ease),
    border-radius 600ms var(--ease);
}
.nav-scrolled {
  top: 12px;
}
.nav-scrolled nav {
  width: min(650px, 100%);
  height: 56px;
  border-radius: 20px;
}
.logo {
  font-family: "JetBrains Mono", monospace;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.04em;
}
.logo span {
  color: var(--lime);
}
.nav-links {
  align-self: stretch;
  display: flex;
  gap: 32px;
}
.nav-links a {
  position: relative;
  display: flex;
  align-items: center;
  color: var(--muted);
  font-size: 13px;
  transition: color 300ms ease;
}
.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 7px;
  height: 1px;
  background: var(--lime);
  transition: right 500ms var(--ease);
}
.nav-links a:hover,
.nav-links a.active {
  color: var(--paper);
}
.nav-links a.active::after {
  right: 0;
}
.nav-cta {
  height: 50px;
  padding: 0 20px;
  border-radius: 16px;
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: center;
  background: var(--lime);
  color: var(--ink);
  font-size: 13px;
  font-weight: 600;
  transition:
    height 500ms var(--ease),
    border-radius 500ms var(--ease),
    background 250ms ease;
}
.nav-cta:hover {
  background: #e0ff70;
}
.nav-scrolled .nav-cta {
  height: 42px;
  border-radius: 13px;
}

.hero {
  min-height: 900px;
  height: 100svh;
  max-height: 1020px;
  padding-top: 145px;
  display: grid;
  grid-template-columns: 7fr 5fr;
  align-items: center;
  gap: 36px;
}
.hero-copy {
  padding-bottom: 42px;
  position: relative;
  z-index: 3;
}
.hero-eyebrow {
  color: var(--muted);
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  opacity: 0;
  animation: fade-up 700ms var(--ease) 100ms forwards;
}
.hero-eyebrow > span:first-child {
  width: 28px;
  height: 1px;
  background: var(--lime);
}
.hero-title {
  margin: 0;
  font-family: "Instrument Serif", serif;
  font-size: clamp(76px, 7.7vw, 122px);
  font-weight: 400;
  line-height: 0.82;
  letter-spacing: -0.052em;
}
.hero-title .line {
  display: block;
  padding-bottom: 0.07em;
  overflow: hidden;
}
.hero-title .line > span {
  display: block;
  transform: translateY(115%);
  animation: line-up 850ms var(--ease) forwards;
}
.hero-title .line:nth-child(1) > span {
  animation-delay: 160ms;
}
.hero-title .line:nth-child(2) > span {
  animation-delay: 240ms;
}
.hero-title .line:nth-child(3) > span {
  animation-delay: 320ms;
}
.hero-title em {
  font-weight: 400;
  color: var(--lime);
}
@keyframes line-up {
  to {
    transform: translateY(0);
  }
}
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.hero-summary {
  max-width: 610px;
  margin: 30px 0 0;
  color: #bec1c7;
  font-size: 17px;
  line-height: 1.65;
  opacity: 0;
  animation: fade-up 800ms var(--ease) 460ms forwards;
}
.hero-actions {
  display: flex;
  gap: 12px;
  margin-top: 34px;
  opacity: 0;
  animation: fade-up 800ms var(--ease) 540ms forwards;
}
.button {
  min-height: 52px;
  padding: 0 22px;
  border-radius: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--lime);
  color: var(--ink);
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition:
    transform 300ms var(--ease),
    background 250ms ease;
}
.button:hover {
  background: #e0ff70;
}
.button-secondary {
  color: var(--paper);
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid var(--line);
}
.button-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}
.hero-meta {
  margin-top: 36px;
  display: flex;
  gap: 23px;
  flex-wrap: wrap;
  color: #858a94;
  opacity: 0;
  animation: fade-up 800ms var(--ease) 620ms forwards;
}
.hero-meta span {
  position: relative;
}
.hero-meta span:not(:last-child)::after {
  content: "";
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #555a62;
  right: -13px;
  top: 5px;
}

.hero-media {
  height: 650px;
  position: relative;
  opacity: 0;
  animation: photo-in 900ms var(--ease) 220ms forwards;
}
@keyframes photo-in {
  from {
    opacity: 0;
    clip-path: inset(100% 0 0 0 round 48% 48% 24px 24px);
  }
  to {
    opacity: 1;
    clip-path: inset(-20% -20% -20% -20% round 0);
  }
}
.hero-photo {
  position: absolute;
  width: min(82%, 410px);
  right: 6%;
  top: 14px;
}
.portrait-wrap {
  --rx: 0deg;
  --ry: 0deg;
  aspect-ratio: 4/5;
  position: relative;
  transform: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry));
  transition: transform 600ms var(--ease);
  transform-style: preserve-3d;
}
.portrait-offset {
  position: absolute;
  inset: 12px -12px -12px 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 49% 49% 22px 22px / 30% 30% 22px 22px;
  background: rgba(255, 255, 255, 0.025);
  backdrop-filter: blur(20px);
}
.portrait-media {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 49% 49% 22px 22px / 30% 30% 22px 22px;
  background: #11151a;
  filter: grayscale(0.85) sepia(0.15) contrast(1.06);
  transition: filter 600ms var(--ease);
}
.portrait-wrap:hover .portrait-media {
  filter: none;
}
.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transform: scale(1.01);
  transition: transform 700ms var(--ease);
}
.portrait-wrap:hover .portrait-img {
  transform: scale(1.04);
}
.portrait-grain {
  position: absolute;
  inset: 0;
  opacity: 0.11;
  pointer-events: none;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 140 140' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='x'%3E%3CfeTurbulence baseFrequency='.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23x)'/%3E%3C/svg%3E");
}
.photo-chip {
  position: absolute;
  z-index: 4;
  min-height: 42px;
  padding: 0 14px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  font:
    10px "JetBrains Mono",
    monospace;
  letter-spacing: 0.04em;
  opacity: 0;
  animation:
    chip-in 650ms var(--ease) forwards,
    chip-drift 7s ease-in-out infinite alternate;
}
.photo-chip i,
.contact-status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 0 4px rgba(212, 255, 58, 0.1);
  margin-right: 9px;
}
.chip-location {
  right: -1%;
  top: 15%;
  animation-delay: 950ms, 1.5s;
}
.chip-open {
  left: -2%;
  top: 34%;
  animation-delay: 1050ms, 2s;
}
.chip-school {
  right: -2%;
  top: 62%;
  animation-delay: 1150ms, 2.8s;
}
@keyframes chip-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
@keyframes chip-drift {
  to {
    margin-top: -9px;
  }
}
.terminal-card {
  position: absolute;
  z-index: 5;
  width: 310px;
  min-height: 205px;
  left: -8%;
  bottom: 4%;
  border-radius: 20px;
  overflow: hidden;
  animation: terminal-float 8s ease-in-out infinite alternate;
}
@keyframes terminal-float {
  to {
    transform: translateY(-10px);
  }
}
.terminal-head {
  height: 42px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line);
  color: #7e838c;
  font:
    9px "JetBrains Mono",
    monospace;
}
.terminal-head span {
  display: flex;
  gap: 5px;
}
.terminal-head i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #555a61;
}
.terminal-body {
  padding: 15px 18px;
  font:
    10px/1.6 "JetBrains Mono",
    monospace;
}
.terminal-body p,
.terminal-body small {
  margin: 0;
  display: block;
}
.terminal-body p {
  color: #b9bdc4;
}
.terminal-body p span,
.terminal-body small b {
  color: var(--lime);
}
.terminal-body small {
  padding-left: 14px;
  margin-bottom: 6px;
  color: #777c85;
}
.caret {
  display: inline-block;
  width: 5px;
  height: 11px;
  margin-left: 5px;
  vertical-align: -2px;
  background: var(--lime);
  animation: blink 1.1s step-end infinite;
}
@keyframes blink {
  50% {
    opacity: 0;
  }
}
.scroll-cue {
  position: absolute;
  bottom: 25px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #676c75;
  font:
    9px "JetBrains Mono",
    monospace;
  letter-spacing: 0.16em;
}
.scroll-cue i {
  display: block;
  width: 86px;
  height: 1px;
  background: #34383e;
  position: relative;
  overflow: hidden;
}
.scroll-cue i::after {
  content: "";
  position: absolute;
  width: 30px;
  height: 1px;
  background: var(--lime);
  animation: scroll-line 2.5s var(--ease) infinite;
}
@keyframes scroll-line {
  from {
    left: -30px;
  }
  to {
    left: 100%;
  }
}

.marquee {
  position: relative;
  z-index: 2;
  overflow: hidden;
  border-block: 1px solid var(--line);
  background: rgba(10, 12, 15, 0.6);
}
.marquee::before,
.marquee::after {
  content: "";
  position: absolute;
  z-index: 2;
  top: 0;
  bottom: 0;
  width: 100px;
  pointer-events: none;
}
.marquee::before {
  left: 0;
  background: linear-gradient(90deg, var(--ink), transparent);
}
.marquee::after {
  right: 0;
  background: linear-gradient(-90deg, var(--ink), transparent);
}
.marquee-track {
  width: max-content;
  height: 64px;
  display: flex;
  align-items: center;
  animation: marquee 38s linear infinite;
}
.marquee:hover .marquee-track {
  animation-play-state: paused;
}
.marquee-track span {
  display: flex;
  align-items: center;
  color: #9ca0a7;
  font:
    11px "JetBrains Mono",
    monospace;
  letter-spacing: 0.08em;
  white-space: nowrap;
}
.marquee-track i {
  width: 4px;
  height: 4px;
  margin: 0 26px;
  border-radius: 50%;
  background: var(--lime);
}
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}

.work-section,
.about-section {
  padding-top: 160px;
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 72px;
}
.section-heading h2,
.contact-main h2 {
  max-width: 820px;
  margin: 18px 0 0;
  font:
    400 clamp(56px, 6vw, 88px)/0.95 "Instrument Serif",
    serif;
  letter-spacing: -0.035em;
}
.section-heading h2 em,
.contact-main h2 em {
  color: var(--lime);
  font-weight: 400;
}
.section-heading > p {
  width: 330px;
  margin: 0 0 8px;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.7;
}
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 750ms var(--ease),
    transform 750ms var(--ease);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
.project-grid {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr;
  grid-template-areas: "featured featured" "kiosk shop";
  gap: 24px;
}
.project-featured {
  grid-area: featured;
}
.project-kiosk {
  grid-area: kiosk;
  transition-delay: 80ms;
}
.project-shop {
  grid-area: shop;
  transition-delay: 160ms;
}
.project-card {
  --rx: 0deg;
  --ry: 0deg;
  min-height: 540px;
  border-radius: 28px;
  display: grid;
  grid-template-columns: 1.25fr 0.75fr;
  transform: perspective(1500px) rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition:
    transform 600ms var(--ease),
    border-color 400ms ease;
}
.project-card:hover {
  border-color: rgba(255, 255, 255, 0.22);
}
.project-card-next {
  border-style: dashed;
  border-color: rgba(212, 255, 58, 0.24);
}
.project-card-next:hover {
  border-color: rgba(212, 255, 58, 0.55);
}
.project-card:not(.featured) {
  min-height: 680px;
  display: flex;
  flex-direction: column;
}
.project-art {
  min-width: 0;
  padding: 24px;
  overflow: hidden;
  border-radius: 27px 0 0 27px;
  background: #12161a;
}
.project-card:not(.featured) .project-art {
  height: 360px;
  border-radius: 27px 27px 0 0;
}
.project-visual {
  width: 100%;
  height: 100%;
  transform: translateZ(16px) scale(1.01);
  transition: transform 800ms var(--ease);
}
.project-card:hover .project-visual {
  transform: translateZ(24px) scale(1.03) translateX(2px);
}

/* Thumbnail Window Visual */
.thumb-visual {
  display: flex;
  align-items: stretch;
  justify-content: center;
}
.thumb-window {
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #0c0f13;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 28px 65px rgba(0, 0, 0, 0.45);
}
.thumb-bar {
  height: 36px;
  padding: 0 14px;
  background: rgba(20, 24, 30, 0.95);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-shrink: 0;
}
.thumb-dots {
  display: flex;
  gap: 6px;
}
.thumb-dots i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #3e444d;
}
.thumb-dots i:first-child {
  background: rgba(212, 255, 58, 0.75);
}
.thumb-url {
  color: #7d838e;
  font:
    9px "JetBrains Mono",
    monospace;
  letter-spacing: 0.06em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.thumb-badge {
  padding: 3px 7px;
  border-radius: 6px;
  background: rgba(212, 255, 58, 0.1);
  border: 1px solid rgba(212, 255, 58, 0.3);
  color: var(--lime);
  font:
    8px "JetBrains Mono",
    monospace;
  letter-spacing: 0.08em;
}
.thumb-viewport {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: radial-gradient(circle at 50% 30%, #1f2630, #0c0f13 75%);
}
.thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 900ms var(--ease);
}
.project-card:hover .thumb-img {
  transform: scale(1.045);
}
.thumb-shine {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(10, 12, 15, 0) 65%,
    rgba(10, 12, 15, 0.42) 100%
  );
}

/* Next Big Things Lab Visual */
.next-visual {
  position: relative;
  border-radius: 16px;
  padding: 22px;
  overflow: hidden;
  background:
    radial-gradient(circle at 82% 18%, rgba(212, 255, 58, 0.14), transparent 48%),
    radial-gradient(circle at 16% 85%, rgba(15, 76, 92, 0.32), transparent 55%),
    #0b0e12;
  border: 1px solid rgba(212, 255, 58, 0.22);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
}
.next-grid-bg {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.22;
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: radial-gradient(circle at 50% 50%, black 35%, transparent 90%);
}
.next-glow {
  position: absolute;
  width: 180px;
  height: 180px;
  right: -40px;
  top: -40px;
  border-radius: 50%;
  background: rgba(212, 255, 58, 0.18);
  filter: blur(45px);
  pointer-events: none;
}
.next-top {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font:
    9px "JetBrains Mono",
    monospace;
  letter-spacing: 0.1em;
}
.next-status {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 10px;
  border-radius: 999px;
  background: rgba(212, 255, 58, 0.1);
  border: 1px solid rgba(212, 255, 58, 0.3);
  color: var(--lime);
}
.next-status i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 8px var(--lime);
  animation: blink 1.6s ease-in-out infinite;
}
.next-coord {
  color: #6d737d;
}
.next-center {
  position: relative;
  z-index: 2;
  margin-block: auto;
  padding-block: 10px;
}
.next-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--lime);
  font:
    9px "JetBrains Mono",
    monospace;
  letter-spacing: 0.12em;
}
.next-center h4 {
  margin: 8px 0 6px;
  font:
    400 32px/1 "Instrument Serif",
    serif;
  color: var(--paper);
  letter-spacing: -0.02em;
}
.next-center p {
  margin: 0;
  max-width: 340px;
  color: #8f95a0;
  font-size: 12px;
  line-height: 1.55;
}
.next-pipeline {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.pipeline-row {
  padding: 8px 11px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.035);
  border: 1px solid rgba(255, 255, 255, 0.07);
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
}
.pipeline-code {
  color: var(--lime);
  font:
    9px "JetBrains Mono",
    monospace;
}
.pipeline-name {
  color: #d5d7dc;
  font-weight: 500;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pipeline-tag {
  font:
    8px "JetBrains Mono",
    monospace;
  font-style: normal;
  padding: 3px 6px;
  border-radius: 5px;
  color: #8f95a0;
  background: rgba(255, 255, 255, 0.04);
}
.pipeline-tag.active {
  color: var(--ink);
  background: var(--lime);
  font-weight: 600;
}

.project-copy {
  min-width: 0;
  padding: 42px 40px 38px 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 5;
}
.project-card:not(.featured) .project-copy {
  flex: 1;
  padding: 28px 32px 28px;
}
.project-index {
  color: var(--lime);
  font:
    10px "JetBrains Mono",
    monospace;
  letter-spacing: 0.1em;
}
.project-copy h3 {
  margin: auto 0 14px;
  font:
    400 42px/1 "Instrument Serif",
    serif;
  letter-spacing: -0.025em;
}
.project-card:not(.featured) .project-copy h3 {
  margin-top: 26px;
  font-size: 36px;
}
.project-copy p {
  margin: 0;
  color: #aeb2b9;
  font-size: 14px;
  line-height: 1.7;
}
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 22px;
}
.tag-row span {
  padding: 7px 10px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 100px;
  color: #9da1a9;
  font:
    9px "JetBrains Mono",
    monospace;
}
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  margin-top: 22px;
}
.project-links a,
.project-links > span {
  min-height: 36px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: var(--paper);
  font-size: 12px;
  transition: color 250ms ease;
}
.project-links a:hover {
  color: var(--lime);
}
.project-links a.next-cta-link {
  color: var(--lime);
  font-weight: 500;
}
.case-link {
  margin-top: 10px;
  height: 0;
  opacity: 0;
  transform: translateX(-10px);
  overflow: hidden;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--lime);
  font:
    10px "JetBrains Mono",
    monospace;
  transition:
    height 500ms var(--ease),
    opacity 500ms ease,
    transform 500ms var(--ease);
}
.project-card:hover .case-link {
  height: 20px;
  opacity: 1;
  transform: translateX(0);
}

.about-section {
  padding-bottom: 160px;
}
.about-heading {
  margin-bottom: 56px;
}
.bento {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 20px;
}
.bento > .reveal {
  border-radius: 24px;
}
.bento-about {
  grid-column: span 8;
  grid-row: span 2;
  min-height: 520px;
  padding: 22px;
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 38px;
}
.about-photo {
  min-height: 100%;
  overflow: hidden;
  border-radius: 15px;
}
.portrait-square {
  height: 100%;
  aspect-ratio: auto;
}
.portrait-square .portrait-offset {
  display: none;
}
.portrait-square .portrait-media {
  border-radius: 14px;
}
.about-copy {
  padding: 24px 24px 24px 0;
  align-self: center;
  position: relative;
  z-index: 5;
}
.about-copy h3 {
  margin: 26px 0 20px;
  font: 400 40px/1.05 "Instrument Serif";
}
.about-copy p {
  color: #aeb2b9;
  font-size: 15px;
  line-height: 1.8;
}
.about-copy a,
.bento-github a {
  min-height: 44px;
  margin-top: 22px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--lime);
  font-size: 13px;
}
.bento-skills {
  grid-column: span 4;
  min-height: 300px;
  padding: 30px;
}
.skill-groups {
  margin-top: 34px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px 14px;
}
.skill-groups b {
  color: var(--paper);
  font: 9px "JetBrains Mono";
  letter-spacing: 0.1em;
}
.skill-groups p {
  color: #aeb2b9;
  font-size: 12px;
  line-height: 1.8;
}
.bento-github {
  grid-column: span 4;
  min-height: 200px;
  padding: 28px;
}
.tile-top {
  display: flex;
  justify-content: space-between;
}
.heatmap {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 4px;
  margin-top: 25px;
}
.heatmap i {
  aspect-ratio: 1;
  border-radius: 2px;
  background: #22272b;
}
.heatmap i[data-level="1"] {
  background: #3e4a25;
}
.heatmap i[data-level="2"] {
  background: #667a2c;
}
.heatmap i[data-level="3"] {
  background: #9fbd35;
}
.heatmap i[data-level="4"] {
  background: var(--lime);
}
.bento-github a {
  margin-top: 20px;
}
.bento-education {
  grid-column: span 7;
  min-height: 210px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bento-education small {
  color: #777d87;
  font: 9px "JetBrains Mono";
}
.bento-education h3 {
  margin: 10px 0 3px;
  font: 400 30px "Instrument Serif";
}
.bento-education p {
  margin: 0;
  color: #aeb2b9;
  font-size: 13px;
}
.bento-languages {
  grid-column: span 5;
  min-height: 210px;
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}
.bento-languages > span {
  grid-column: 1/-1;
}
.bento-languages b {
  color: var(--lime);
  font: 12px "JetBrains Mono";
}
.bento-languages p {
  margin: 8px 0 0;
  color: #aeb2b9;
  font-size: 12px;
  line-height: 1.5;
}

.contact-section {
  padding: 80px 0 100px;
}
.contact-card {
  min-height: 600px;
  padding: 40px 52px 45px;
  border-radius: 28px;
}
.contact-status {
  display: flex;
  align-items: center;
  padding-bottom: 28px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
  font: 9px "JetBrains Mono";
  letter-spacing: 0.1em;
}
.contact-status b {
  margin-left: auto;
  font-weight: 400;
  color: #6f747d;
}
.contact-main {
  padding-top: 52px;
  position: relative;
  z-index: 5;
}
.contact-main h2 {
  font-size: clamp(62px, 7vw, 102px);
}
.contact-main p {
  color: var(--muted);
  font-size: 15px;
}
.email-row {
  margin-top: 54px;
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
  position: relative;
  z-index: 5;
}
.email-row > a {
  font: 400 clamp(27px, 4vw, 54px) "Instrument Serif";
  transition: color 250ms ease;
}
.email-row > a:hover {
  color: var(--lime);
}
.email-row button {
  min-height: 44px;
  margin-left: auto;
  padding: 0 15px;
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  gap: 8px;
  font: 10px "JetBrains Mono";
  cursor: pointer;
}
.contact-links {
  margin-top: 20px;
  display: flex;
  gap: 12px;
  position: relative;
  z-index: 5;
}
.contact-links a {
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid var(--line);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b9bdc4;
  font-size: 12px;
  transition:
    background 250ms ease,
    color 250ms ease;
}
.contact-links a svg:last-child {
  margin-left: 8px;
}
.contact-links a:hover {
  background: rgba(255, 255, 255, 0.06);
  color: var(--lime);
}

footer {
  min-height: 100px;
  border-top: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #70757e;
}
footer a {
  min-height: 44px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #aeb2b9;
}
footer a:hover {
  color: var(--lime);
}

/* CV Preview Modal */
.cv-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 100;
  padding: 24px;
  background: rgba(6, 8, 10, 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: modal-fade 250ms var(--ease) forwards;
}
@keyframes modal-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.cv-modal {
  width: min(1040px, 100%);
  height: min(88svh, 860px);
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: rgba(14, 17, 22, 0.94);
  border: 1px solid rgba(255, 255, 255, 0.14);
  animation: modal-pop 380ms var(--ease) forwards;
}
@keyframes modal-pop {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.cv-modal-head {
  padding: 16px 22px;
  border-bottom: 1px solid var(--line);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}
.cv-modal-title {
  display: flex;
  align-items: center;
  gap: 12px;
}
.cv-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lime);
  box-shadow: 0 0 0 4px rgba(212, 255, 58, 0.14);
}
.cv-modal-title b {
  display: block;
  font:
    500 11px "JetBrains Mono",
    monospace;
  letter-spacing: 0.08em;
  color: var(--paper);
}
.cv-modal-title small {
  display: block;
  margin-top: 2px;
  font:
    10px "JetBrains Mono",
    monospace;
  color: var(--muted);
}
.cv-modal-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.cv-btn {
  min-height: 40px;
  padding: 0 15px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition:
    background 220ms ease,
    color 220ms ease,
    border-color 220ms ease;
}
.cv-btn-primary {
  background: var(--lime);
  color: var(--ink);
}
.cv-btn-primary:hover {
  background: #e0ff70;
}
.cv-btn-ghost {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--line);
  color: var(--paper);
  font-weight: 500;
}
.cv-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--lime);
}
.cv-btn-close {
  width: 40px;
  padding: 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--line);
  color: var(--muted);
}
.cv-btn-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--paper);
}
.cv-modal-body {
  flex: 1;
  min-height: 0;
  background: #0d1014;
}
.cv-iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.toast {
  position: fixed;
  z-index: 80;
  left: 50%;
  bottom: 24px;
  min-height: 46px;
  padding: 0 17px;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: #1a1e20;
  color: var(--paper);
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  gap: 9px;
  font: 11px "JetBrains Mono";
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, 20px);
  transition:
    opacity 400ms ease,
    transform 500ms var(--ease);
}
.toast svg {
  color: var(--lime);
}
.toast.show {
  opacity: 1;
  transform: translate(-50%, 0);
}

@media (max-width: 1024px) {
  .page-shell {
    width: min(100% - 48px, 960px);
  }
  .hero {
    min-height: 900px;
    grid-template-columns: 1.12fr 0.88fr;
    gap: 12px;
  }
  .hero-title {
    font-size: clamp(68px, 9vw, 90px);
  }
  .hero-media {
    height: 590px;
  }
  .hero-photo {
    width: 86%;
    right: 2%;
  }
  .terminal-card {
    left: -15%;
    bottom: 8%;
    width: 270px;
  }
  .chip-school {
    display: none;
  }
  .section-heading > p {
    width: 290px;
  }
  .bento-about {
    grid-column: 1/-1;
  }
  .bento-skills,
  .bento-github {
    grid-column: span 6;
  }
}

@media (max-width: 767px) {
  .page-shell {
    width: min(100% - 32px, 560px);
  }
  .nav-wrap {
    top: 12px;
    padding-inline: 10px;
  }
  .nav-wrap nav {
    height: 58px;
    padding: 6px 7px 6px 15px;
    border-radius: 19px;
  }
  .nav-links {
    gap: 18px;
  }
  .nav-links a {
    font-size: 12px;
  }
  .nav-links a:nth-child(2) {
    display: none;
  }
  .nav-cta {
    width: 44px;
    height: 44px;
    padding: 0;
    font-size: 0;
    border-radius: 13px;
  }
  .hero {
    height: auto;
    max-height: none;
    min-height: 0;
    padding-top: 112px;
    padding-bottom: 90px;
    display: flex;
    flex-direction: column;
    gap: 42px;
  }
  .hero-media {
    order: -1;
    width: 100%;
    height: 490px;
  }
  .hero-photo {
    width: min(78%, 330px);
    right: 9%;
    top: 0;
  }
  .chip-location,
  .chip-school {
    display: none;
  }
  .chip-open {
    left: 2%;
    top: auto;
    bottom: 75px;
  }
  .terminal-card {
    width: 230px;
    min-height: 160px;
    left: auto;
    right: 0;
    bottom: 0;
  }
  .terminal-head {
    height: 34px;
  }
  .terminal-body {
    padding: 10px 14px;
    font-size: 8px;
  }
  .terminal-body p:nth-of-type(3),
  .terminal-body p:nth-of-type(3) + small {
    display: none;
  }
  .hero-copy {
    padding-bottom: 0;
  }
  .hero-eyebrow {
    margin-bottom: 22px;
  }
  .hero-title {
    font-size: clamp(58px, 16.5vw, 72px);
    line-height: 0.88;
  }
  .hero-summary {
    font-size: 16px;
    margin-top: 24px;
  }
  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }
  .button {
    width: 100%;
  }
  .hero-meta {
    gap: 18px;
    line-height: 1.5;
  }
  .hero-meta span:nth-child(2) {
    display: none;
  }
  .scroll-cue {
    display: none;
  }
  .marquee-track {
    height: 56px;
  }
  .work-section,
  .about-section {
    padding-top: 112px;
  }
  .section-heading {
    display: block;
    margin-bottom: 46px;
  }
  .section-heading h2,
  .contact-main h2 {
    font-size: 52px;
  }
  .section-heading > p {
    width: auto;
    margin-top: 26px;
  }
  .project-grid {
    display: flex;
    flex-direction: column;
  }
  .project-card,
  .project-card:not(.featured) {
    min-height: 0;
    display: flex;
    flex-direction: column;
  }
  .project-art,
  .project-card:not(.featured) .project-art {
    height: 300px;
    border-radius: 25px 25px 0 0;
    padding: 16px;
  }
  .project-copy,
  .project-card:not(.featured) .project-copy {
    padding: 28px 24px 26px;
  }
  .project-copy h3,
  .project-card:not(.featured) .project-copy h3 {
    margin-top: 28px;
    font-size: 36px;
  }
  .bento {
    display: flex;
    flex-direction: column;
  }
  .bento-about {
    display: flex;
    flex-direction: column;
    padding: 16px;
    min-height: 0;
  }
  .about-photo {
    height: 390px;
  }
  .about-copy {
    padding: 18px 10px 20px;
  }
  .about-copy h3 {
    font-size: 35px;
  }
  .bento > .reveal {
    min-height: 0;
  }
  .bento-skills,
  .bento-github,
  .bento-education,
  .bento-languages {
    padding: 26px;
  }
  .bento-languages {
    display: grid;
  }
  .about-section {
    padding-bottom: 90px;
  }
  .contact-section {
    padding: 40px 0 70px;
  }
  .contact-card {
    min-height: 0;
    padding: 26px 22px 28px;
  }
  .contact-status b {
    display: none;
  }
  .contact-main {
    padding-top: 42px;
  }
  .contact-main h2 {
    font-size: 48px;
  }
  .email-row {
    margin-top: 42px;
  }
  .email-row button span {
    display: none;
  }
  .contact-links {
    flex-direction: column;
  }
  .cv-modal-backdrop {
    padding: 12px;
  }
  .cv-modal {
    height: 90svh;
    border-radius: 18px;
  }
  .cv-btn-ghost {
    display: none;
  }
  footer {
    min-height: 120px;
    flex-wrap: wrap;
    gap: 8px 20px;
    padding-block: 25px;
  }
  footer span:nth-child(2) {
    display: none;
  }
}

@media (max-width: 410px) {
  .hero-media {
    height: 450px;
  }
  .hero-title {
    font-size: 59px;
  }
  .hero-photo {
    width: 82%;
    right: 6%;
  }
  .terminal-card {
    width: 215px;
  }
  .project-art,
  .project-card:not(.featured) .project-art {
    height: 270px;
  }
  .contact-main h2 {
    font-size: 43px;
  }
  .email-row > a {
    font-size: 25px;
  }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .hero-title .line > span,
  .hero-eyebrow,
  .hero-summary,
  .hero-actions,
  .hero-meta,
  .hero-media,
  .photo-chip,
  .reveal {
    opacity: 1;
    transform: none;
    clip-path: none;
  }
  .marquee-track {
    animation: none;
  }
  .custom-cursor {
    display: none;
  }
}

@media (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}


# File: src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);


# File: tsconfig.app.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}


# File: tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}


# File: tsconfig.node.json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}


# File: vite.config.ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})