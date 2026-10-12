import { useState } from 'react';
import styles from './MailMint.module.css';
import Navbar from '../../components/Navbar/Navbar';
import Lightbox from '../../components/Lightbox/Lightbox';
import { getProjectNavigation } from '../../utils/projects';
import mailmintHero from '../../assets/Mockup image.png';
import generationImg from '../../assets/mailmint-generation.webp';
import loginImg from '../../assets/mailmint-login.webp';
import libraryImg from '../../assets/mailmint-library.webp';
import signupImg from '../../assets/mailmint-signup.webp';
import draftsImg from '../../assets/mailmint-drafts.webp';
import landingHero from '../../assets/Mailmint hero.webp';

/* ---------- Inline icons (stroke, currentColor): portfolio icon system ---------- */
const Icon = {
  ArrowLeft: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  ),
  ArrowUpRight: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M7 17 17 7M7 7h10v10" />
    </svg>
  ),
  ArrowRight: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  ),
  Flag: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 21V4M4 4h13l-2 4 2 4H4" />
    </svg>
  ),
  Pen: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5zM2 2l7.586 7.586" />
    </svg>
  ),
  Code: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14" />
    </svg>
  ),
  Rocket: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 15c-1 1-2 5-2 5s4-1 5-2c.7-.7.7-1.8 0-2.5s-1.8-.7-2.5 0zM9 12c4-7 9-9 11-9 0 2-2 7-9 11l-2-2zM14.5 9.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
    </svg>
  ),
  Sparkle: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3zM19 14l.8 2.1L22 17l-2.2.9L19 20l-.8-2.1L16 17l2.2-.9L19 14z" />
    </svg>
  ),
  Bolt: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  Sliders: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M4 6h11M19 6h1M4 12h1M9 12h11M4 18h7M15 18h5" />
      <circle cx="17" cy="6" r="2" /><circle cx="7" cy="12" r="2" /><circle cx="13" cy="18" r="2" />
    </svg>
  ),
  Layers: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 3 8l9 5 9-5-9-5zM3 13l9 5 9-5M3 18l9 5 9-5" />
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3l8 3v6c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V6l8-3z" />
    </svg>
  ),
  User: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Users: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Clock: (p) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  ),
};

const META = [
  { icon: Icon.User, label: 'Lead Product Designer' },
  { icon: Icon.Users, label: '16-person team' },
  { icon: Icon.Clock, label: 'Apr – May 2026' },
];

const ROLE_CARDS = [
  { icon: Icon.Flag, title: 'Leadership', desc: 'Led product strategy, planning and overall design direction across the project.' },
  { icon: Icon.Pen, title: 'Design', desc: 'Designed a clean, intuitive UI and structured the UX across onboarding, authentication, and core product flows.' },
  { icon: Icon.Code, title: 'Collaboration', desc: 'Partnered closely with engineering to translate design specs into implementation-ready components and ensure design intent held through build.' },
  { icon: Icon.Rocket, title: 'Delivery', desc: 'Helped deliver a polished, production-ready platform from concept to launch.' },
];

const CHALLENGES = [
  {
    title: 'AI prompt engineering',
    challenge:
      'AI-generated responses frequently returned inconsistent formatting, which meant the generated email cards in the UI would sometimes break layout or show malformed content to the user.',
    solution:
      "We refined the prompt architecture to guide output structure more consistently, allowing generated outreach emails to map cleanly into MailMint's editing and rendering system, and keeping the interface reliable regardless of what the model returned.",
  },
  {
    title: 'Scope: Where to Draw the MVP Line',
    challenge:
      "MailMint was built for freelancers and early-stage teams, but we knew that as those users grew, they'd eventually need capabilities the MVP didn't offer. Designing for that future user could have meant building more complexity into the product than a first release could support.",
    solution:
      "We made a deliberate call to scope MailMint tightly around its actual first users and defer the 'what happens when someone outgrows this' question to a future version 2, rather than let it dilute the MVP. Keeping that boundary clear kept the product focused and let us ship something coherent instead of a half-built version of something bigger.",
  },
];

const COLOR_TOKENS = [
  { name: 'Primary', hex: '#0DB5A7' },
  { name: 'Dark', hex: '#1B0E20' },
  { name: 'Light', hex: '#F5F0FA' },
  { name: 'Success', hex: '#22c55e' },
  { name: 'Warning', hex: '#eab308' },
  { name: 'Danger', hex: '#ef4444' },
];

const GALLERY = [
  { img: libraryImg, label: 'Library' },
  { img: draftsImg, label: 'Draft' },
  { img: generationImg, label: 'Dashboard' },
];

const SectionHeading = ({ num, children }) => (
  <div className={styles.sectionHeading}>
    <span className={styles.sectionNum}>{num}</span>
    <h2 className={styles.sectionTitle}>{children}</h2>
  </div>
);

const ProcessPair = ({ reverse, img, alt, title, children }) => (
  <div className={`${styles.pair} ${reverse ? styles.pairReverse : ''}`}>
    <div className={styles.pairMedia}>
      <img src={img} alt={alt} className={styles.pairImg} loading="lazy" />
    </div>
    <div className={styles.pairText}>
      <h3 className={styles.pairTitle}>{title}</h3>
      <div className={styles.prose}>{children}</div>
    </div>
  </div>
);

const Collapsible = ({ preview, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? children : preview}
      <button
        type="button"
        className={styles.readToggle}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        {open ? 'Read less' : 'Read more'}
      </button>
    </>
  );
};

const MailMint = () => {
  const [lightbox, setLightbox] = useState(null);
  const { prev: prevProject, next: nextProject, home: homeRoute } = getProjectNavigation('mailmint');

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.main}>
        <article className={styles.content}>
          {/* HERO IMAGE */}
          <img src={mailmintHero} alt="MailMint running on a laptop" className={styles.heroImg} fetchPriority="high" decoding="async" />

          {/* TITLE ROW */}
          <div className={styles.titleRow}>
            <h1 className={styles.title}>MailMint</h1>
            <span className={styles.descriptor}>AI cold email platform</span>
          </div>

          <hr className={styles.divider} />

          {/* METADATA */}
          <div className={styles.metaRow}>
            {META.map(({ icon: MetaIcon, label }) => (
              <span key={label} className={styles.metaItem}>
                <MetaIcon className={styles.metaIcon} aria-hidden="true" />
                {label}
              </span>
            ))}
            <a
              href="https://mailmintAI.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.liveMvpCta}
            >
              View Live MVP <span className={styles.ctaArrow} aria-hidden="true">↗</span>
            </a>
          </div>

          {/* 01: THE PROBLEM */}
          <section className={styles.section}>
            <SectionHeading num="01">The problem</SectionHeading>
            <div className={styles.prose}>
              <p>
                MailMint began as a brief for our bootcamp cohort, but the direction came from
                research we did beyond it. We ran a competitor analysis across existing email
                generation and outreach tools, put together a market intelligence report, and built
                out a PRD before any design work started.
              </p>
              <p>
                What we found: most existing tools were built with a company-scale, technical user in
                mind. Individuals could use them, but the cost and the learning curve worked against
                anyone without a team or a budget behind them. Generating a clear, structured cold
                email sequence took more setup and technical understanding than it should have.
              </p>
              <p>
                That gap shaped who we built for: freelancers, small teams, and early-stage founders
                who need to send outreach that sounds intentional, without the overhead of an
                enterprise tool. It also shaped the core design principle, simplicity. Every screen
                was built around direct, plain language and a guided flow, so the interface never
                assumes technical fluency from the person using it.
              </p>
              <p>
                We scoped this deliberately as an MVP. Questions like what happens when a user
                outgrows MailMint and needs more advanced tooling were real considerations we
                discussed, but we made the call to defer them to a future version rather than let
                scope creep dilute the first release.
              </p>
            </div>
          </section>

          {/* 02: MY ROLE & CONTRIBUTION */}
          <section className={styles.section}>
            <SectionHeading num="02">My role and contribution</SectionHeading>
            <span className={styles.roleTag}>Lead Product Designer</span>
            <div className={styles.prose}>
              <p>
                I led design for MailMint's MVP within a 16-member cross-functional team, coordinating
                design activities, structuring workflows from discovery through implementation, and
                directly contributing to authentication flow UX, landing page UX, the sign-up/login
                experience, and parts of the landing page UI.
              </p>
              <p>
                One of the harder parts of leading a team that size was collaboration itself,
                specifically, getting a consistent Git workflow across people with different
                experience levels. Early conflicting pull requests and unclear handoffs were creating
                unnecessary friction. A teammate proposed a structured process to address it, which I
                contributed to and helped put in place: contributors push finished work to their own
                branch, open a pull request into an intermediate staging branch, rather than main, for
                review, and only merge to main once conflicts are resolved and the change is verified.
                That extra checkpoint gave the team a place to catch problems before they hit the main
                branch, instead of untangling them after the fact.
              </p>
            </div>

            <div className={styles.roleGrid}>
              {ROLE_CARDS.map((r) => (
                <div key={r.title} className={styles.roleCard}>
                  <div className={styles.roleIcon}><r.icon /></div>
                  <h4 className={styles.roleCardTitle}>{r.title}</h4>
                  <p className={styles.roleCardDesc}>{r.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 03: DESIGN PROCESS & KEY DECISIONS */}
          <section className={styles.section}>
            <SectionHeading num="03">Design process &amp; key decisions</SectionHeading>

            <ProcessPair img={loginImg} alt="MailMint authentication screens" title="Authentication flow">
              <Collapsible
                preview={
                  <p>
                    Authentication was the hardest part of MailMint to get right, and it became my first
                    real experience working through how an authentication system actually functions, not
                    just how it should look. We had the UI built early: login, sign-up, and
                    forgot-password screens. The difficulty was in connecting that UI to a working system
                    underneath it, using Supabase for both authentication and the database.
                  </p>
                }
              >
                <p>
                  Authentication was the hardest part of MailMint to get right, and it became my first
                  real experience working through how an authentication system actually functions, not
                  just how it should look. We had the UI built early: login, sign-up, and
                  forgot-password screens. The difficulty was in connecting that UI to a working system
                  underneath it, using Supabase for both authentication and the database.
                </p>
                <p>
                  Issues surfaced across nearly every part of the flow: email/password sign-up would
                  return errors even when the underlying user and profile tables looked correctly
                  configured; the "Get Started" button had a routing misconfiguration that sent users
                  somewhere unintended; and the forgot-password flow worked locally but broke after
                  deployment, because the production reset-password URL hadn't been added to Supabase's
                  redirect configuration. Google authentication, by comparison, was more straightforward
                  once set up.
                </p>
                <p>
                  The most stressful version of this happened live: during our demo day presentation, an
                  authentication error appeared on stage, on a flow that had worked hours earlier. We had
                  to trace and fix it in real time.
                </p>
                <p>
                  Working through these issues meant learning to isolate where a failure was actually
                  coming from (the interface, the routing, Supabase Auth, or the database) and
                  iterating until each piece held up under real use. I came out of it with a genuinely
                  deeper understanding of what happens between a user clicking "Sign Up" and becoming an
                  authenticated user inside a product, not just how to design the screen they see.
                </p>
              </Collapsible>
            </ProcessPair>

            <ProcessPair reverse img={landingHero} alt="MailMint landing page" title="Landing page">
              <p>
                The landing page had one job: convince a first-time visitor, within seconds, that
                MailMint could do something existing tools made difficult. The hero leads with the
                single clearest value proposition (how fast and simple email generation can be) as
                the largest, most immediate thing on the page. Supporting sections below it exist to
                answer the follow-up question a convinced-but-cautious visitor would have next: why
                MailMint, specifically.
              </p>
            </ProcessPair>

            <ProcessPair img={signupImg} alt="MailMint sign-up and login experience" title="Sign-up &amp; login">
              <Collapsible
                preview={
                  <p>
                    For the sign-up form, the key decision was around how password requirements were
                    communicated. Rather than letting users submit the form and then telling them what was
                    wrong, I designed the password field to show requirements (special character, capital
                    letter, number) inline, as they type, with the submit button staying disabled until
                    all requirements are met. That removes a moment of friction and frustration that a lot
                    of sign-up flows create: finding out you did something wrong only after you thought
                    you were done.
                  </p>
                }
              >
                <p>
                  For the sign-up form, the key decision was around how password requirements were
                  communicated. Rather than letting users submit the form and then telling them what was
                  wrong, I designed the password field to show requirements (special character, capital
                  letter, number) inline, as they type, with the submit button staying disabled until
                  all requirements are met. That removes a moment of friction and frustration that a lot
                  of sign-up flows create: finding out you did something wrong only after you thought
                  you were done.
                </p>
                <p>
                  The login flow, by contrast, was kept deliberately conventional. There was no reason to
                  innovate on a pattern users already know well, so it follows the standard, familiar
                  structure rather than introducing anything unexpected.
                </p>
              </Collapsible>
            </ProcessPair>

            {/* Additional real screens, kept smaller for rhythm */}
            <div className={styles.gallery}>
              {GALLERY.map((s) => (
                <figure key={s.label} className={styles.galleryItem}>
                  <img
                    src={s.img}
                    alt={s.label}
                    className={styles.galleryImg}
                    loading="lazy"
                    onClick={() => setLightbox({ src: s.img, alt: s.label })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setLightbox({ src: s.img, alt: s.label });
                      }
                    }}
                  />
                  <figcaption className={styles.galleryLabel}>{s.label}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* 04: DESIGN SYSTEM */}
          <section className={styles.section}>
            <SectionHeading num="04">Design system</SectionHeading>
            <p className={styles.proseLead}>
              MailMint's interface system was designed around reusable UI patterns, scalable design
              tokens, and workflow consistency. From typography and tone selectors to email cards and
              interaction states, every component was structured to create a cohesive product
              experience across light and dark environments.
            </p>

            <div className={styles.dsGrid}>
              <div className={`${styles.dsCard} ${styles.dsSpanFull}`}>
                <span className={styles.dsLabel}>Typography</span>
                <div className={styles.typeGrid}>
                  <div className={styles.typeItem}>
                    <span className={styles.typeNameDisplay}>Bricolage Grotesque</span>
                    <span className={styles.typeMeta}>Display / Section Headings / Hero Titles</span>
                  </div>
                  <div className={styles.typeItem}>
                    <span className={styles.typeNameUI}>Inter</span>
                    <span className={styles.typeMeta}>UI Text / Forms / Product Interface</span>
                  </div>
                  <div className={styles.typeItem}>
                    <span className={styles.typeNameMono}>SF Mono / Fira Code</span>
                    <span className={styles.typeMeta}>Personalization Variables</span>
                    <div className={styles.varChips}>
                      <span className={styles.varChip}>{'{{first_name}}'}</span>
                      <span className={styles.varChip}>{'{{company}}'}</span>
                      <span className={styles.varChip}>{'{{industry}}'}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`${styles.dsCard} ${styles.dsSpan8}`}>
                <span className={styles.dsLabel}>Color Tokens</span>
                <div className={styles.colorRow}>
                  {COLOR_TOKENS.map((c) => (
                    <div key={c.name} className={styles.colorItem}>
                      <span className={styles.colorSwatch} style={{ backgroundColor: c.hex }}></span>
                      <span className={styles.colorName}>{c.name}</span>
                      <span className={styles.colorHex}>{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.dsCard}>
                <span className={styles.dsLabel}>Buttons</span>
                <div className={styles.btnShowcase}>
                  <button className={styles.btnTeal}>Generate Sequence</button>
                  <button className={styles.btnOutline}>Save to Library</button>
                  <button className={styles.btnTealText}>Rewrite Email</button>
                </div>
              </div>

              <div className={styles.dsCard}>
                <span className={styles.dsLabel}>Tone Selector</span>
                <div className={styles.chipShowcase}>
                  <span className={styles.toneActive}>Professional</span>
                  <span className={styles.toneIdle}>Casual</span>
                  <span className={styles.toneIdle}>Bold</span>
                  <span className={styles.toneIdle}>Consultative</span>
                </div>
              </div>

              <div className={`${styles.dsCard} ${styles.dsSpan8}`}>
                <span className={styles.dsLabel}>Input Fields</span>
                <div className={styles.inputShowcase}>
                  <label className={styles.inputLabel}>Email Address</label>
                  <input className={styles.inputField} disabled placeholder="user@workspace.com" />
                  <label className={styles.inputLabel}>Target Audience</label>
                  <input className={styles.inputFieldFocused} disabled placeholder="e.g. SaaS founders, startup marketers" />
                  <label className={styles.inputLabel}>Key Offer</label>
                  <input className={styles.inputField} disabled placeholder="e.g. Cold outreach platform for teams" />
                </div>
              </div>
            </div>
          </section>

          {/* 05: CHALLENGES & TRADE-OFFS */}
          <section className={styles.section}>
            <SectionHeading num="05">Challenges &amp; trade-offs</SectionHeading>
            <div className={styles.challengeGrid}>
              {CHALLENGES.map((c) => (
                <div key={c.title} className={styles.challengeCard}>
                  <h3 className={styles.challengeTitle}>{c.title}</h3>
                  <div className={styles.challengeBlock}>
                    <span className={styles.challengeTag}>Challenge</span>
                    <p className={styles.challengeText}>{c.challenge}</p>
                  </div>
                  <div className={styles.challengeBlock}>
                    <span className={styles.challengeTagSolution}>Solution</span>
                    <p className={styles.challengeText}>{c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 06: OUTCOME */}
          <section className={styles.section}>
            <SectionHeading num="06">Outcome</SectionHeading>
            <div className={styles.outcome}>
              <p>
                MailMint started as a bootcamp brief and became a real, shipped MVP, built and led with
                a 16-person team under a real deadline. It gave me my first hands-on experience with
                authentication, AI-assisted development, and leading a team through the kind of
                collaboration friction that only shows up once real people with real deadlines are
                involved.
              </p>
              <p>
                What I'd do differently next time: build in more buffer for testing production-specific
                issues, like the auth redirect problem, before a live demo, rather than discovering
                them on stage.
              </p>
            </div>
          </section>

          {/* PROJECT NAVIGATION */}
          <nav className={styles.footerNav} aria-label="Project navigation">
            {prevProject && (
              <a href={prevProject.path} className={`${styles.navCta} ${styles.navCtaPrev}`} aria-label="Previous project">
                <span className={styles.navCtaLabel}>PREVIOUS PROJECT</span>
                <span className={styles.navCtaName}>
                  <Icon.ArrowLeft className={styles.navCtaArrow} /> Previous Project
                </span>
              </a>
            )}

            {nextProject ? (
              <a href={nextProject.path} className={`${styles.navCta} ${styles.navCtaNext}`} aria-label="Next project">
                <span className={styles.navCtaLabel}>NEXT PROJECT</span>
                <span className={styles.navCtaName}>
                  Next Project <Icon.ArrowRight className={styles.navCtaArrow} />
                </span>
              </a>
            ) : (
              <a href={homeRoute} className={`${styles.navCta} ${styles.navCtaNext}`} aria-label="Go back home">
                <span className={styles.navCtaLabel}>BACK TO HOME</span>
                <span className={styles.navCtaName}>
                  Go Back Home <Icon.ArrowRight className={styles.navCtaArrow} />
                </span>
              </a>
            )}
          </nav>
        </article>
      </main>

      <footer className={styles.footer}>
        <a href="#/" className={styles.backLink}>
          <Icon.ArrowLeft /> Back to portfolio
        </a>
      </footer>

      {lightbox && (
        <Lightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
};

export default MailMint;
