import { useEffect, useRef, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Poise.module.css'

import heroPhone from '../../assets/poise/heroPhone.webp'
import clothesRack from '../../assets/poise/clothesRack.webp'
import poiseWordmark from '../../assets/poise/poiseWordmark.png'
import quoteWardrobe from '../../assets/poise/quoteWardrobe.webp'
import tosinCoker from '../../assets/poise/tosinCoker.webp'
import logWardrobeVideo from '../../assets/poise/logWardrobe.mp4'
import logWardrobePoster from '../../assets/poise/logWardrobePoster.webp'
import refreshOutfitVideo from '../../assets/poise/refreshOutfit.mp4'
import refreshOutfitPoster from '../../assets/poise/refreshOutfitPoster.webp'
import screenHome from '../../assets/poise/screenHome.webp'
import screenWardrobeEmpty from '../../assets/poise/screenWardrobeEmpty.webp'
import screenWardrobe from '../../assets/poise/screenWardrobe.webp'
import screenItemDetail from '../../assets/poise/screenItemDetail.webp'
import screenAddItem from '../../assets/poise/screenAddItem.webp'
import screenCategorise from '../../assets/poise/screenCategorise.webp'
import screenHistory from '../../assets/poise/screenHistory.webp'
import screenProfile from '../../assets/poise/screenProfile.webp'
import { icons } from './poiseIcons'

const roleTags = ['Product Designer', 'AI Assisted building', 'Aug 2026 - Sep 2026']
const toolTags = ['Figma', 'Antigravity', 'Claude code']

const aboutPoints = [
  'No more asking "would this go with this?" Would this top go with this bottom? Do these shoes work? These jewelries? Poise settles it before you even ask.',
  "A new outfit, every day, without the thinking. Poise builds a combination from your own pieces so you're not starting from scratch each morning.",
  'Not your vibe today? Skip. One tap and Poise serves another look. Settling is not on the menu. Wear it, own it, and let your history show you what you actually love.',
]

const problemPoints = [
  <><strong>I relate to this. Deeply.</strong> Even a stay-home day or a walk around the estate turns into a decision. Different event, different occasion, same struggle: standing in front of a full closet, still not knowing what to wear.</>,
  "It's never the clothes. It's the combining. You own enough. What's missing is a fast way to put it together, and that's the part that's actually draining you.",
  'So you end up planning ahead, just to avoid wasting the time. Figuring it out every single day is too much, so outfits get planned in advance instead.',
]

const personaPoints = [
  { icon: 'calendar', title: 'Work pattern:', text: 'Remote, Monday to Friday, effectively on call around the clock whenever her boss needs her.' },
  { icon: 'angry', title: 'Frustration:', text: "No room left in the day for one more decision. Picking an outfit competes with a schedule that's already unpredictable." },
  { icon: 'idea', title: 'Workaround:', text: "Plans outfits weeks in advance. Daily decision-making isn't something her schedule can absorb." },
  { icon: 'view', title: 'Blind spot:', text: 'Owns more than she realizes, clothes get lost inside a full wardrobe, sometimes rediscovered by accident.' },
]

function HugeIcon({ name, className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {icons[name].map(([Tag, attrs], i) => <Tag key={i} {...attrs} />)}
    </svg>
  )
}

/* iPhone mockup drawn in CSS, holding a looping screen recording.
   Plays only while on screen; respects reduced motion. */
function PhoneVideo({ src, poster, label }) {
  const ref = useRef(null)
  useEffect(() => {
    const video = ref.current
    if (!video) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.35 })
    io.observe(video)
    return () => io.disconnect()
  }, [])
  return (
    <div className={styles.phone}>
      <div className={styles.phoneScreen}>
        <video
          ref={ref}
          className={styles.phoneVideo}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
        />
      </div>
      <span className={styles.phoneIsland} aria-hidden="true" />
    </div>
  )
}

function PhoneShot({ src, alt }) {
  return (
    <div className={styles.phoneShot}>
      <img src={src} alt={alt} />
    </div>
  )
}

const screensTop = [
  { src: screenHome, alt: 'Home screen with today’s AI-styled outfit' },
  { src: screenWardrobeEmpty, alt: 'Empty wardrobe screen prompting the first five items' },
  { src: screenWardrobe, alt: 'Wardrobe screen with category filters and item grid' },
  { src: screenItemDetail, alt: 'Item detail screen for a white linen shirt' },
]
const screensBottom = [
  { src: screenAddItem, alt: 'Add item camera screen' },
  { src: screenCategorise, alt: 'Categorise item screen with category and colour' },
  { src: screenHistory, alt: 'Profile history with outfits this month and recent wears' },
  { src: screenProfile, alt: 'Profile screen with saved outfits grid' },
]

function PhoneScreen({ src, alt }) {
  return (
    <div className={`${styles.phone} ${styles.phoneSmall}`}>
      <div className={styles.phoneScreen}>
        <img className={styles.phoneImage} src={src} alt={alt} loading="lazy" />
      </div>
      <span className={styles.phoneIsland} aria-hidden="true" />
    </div>
  )
}

/* Endless row of phones. The set is repeated so the loop never shows a gap;
   copies after the first are hidden from screen readers. */
function ScreenMarquee({ items, direction }) {
  const set = [...items, ...items, ...items]
  return (
    <div className={styles.marquee}>
      <div className={`${styles.marqueeTrack} ${direction === 'right' ? styles.toRight : styles.toLeft}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.marqueeSet} aria-hidden={copy === 1 ? 'true' : undefined}>
            {set.map((item, i) => (
              <PhoneScreen key={i} src={item.src} alt={copy === 0 && i < items.length ? item.alt : ''} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/* Live app in an iPhone mockup. The app is rendered at a real phone width (390px)
   and scaled to fit the mockup's screen, so it looks the same at every size. */
const DEMO_URL = 'https://poisedrip.vercel.app'
const APP_WIDTH = 390

function DemoPhone() {
  const screenRef = useRef(null)
  const frameRef = useRef(null)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    const screen = screenRef.current
    const frame = frameRef.current
    if (!screen || !frame) return
    const fit = () => {
      const { width, height } = screen.getBoundingClientRect()
      const scale = width / APP_WIDTH
      frame.style.width = `${APP_WIDTH}px`
      frame.style.height = `${height / scale}px`
      frame.style.transform = `scale(${scale})`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(screen)
    return () => ro.disconnect()
  }, [])
  return (
    <div className={`${styles.phone} ${styles.demoPhone}`}>
      <div className={styles.phoneScreen}>
        <div ref={screenRef} className={styles.demoViewport}>
          <iframe
            ref={frameRef}
            className={styles.demoFrame}
            src={DEMO_URL}
            title="Poise live demo"
            loading="lazy"
            onLoad={() => setLoaded(true)}
          />
          <img
            className={`${styles.demoLoadingImg} ${loaded ? styles.demoLoadingImgHidden : ''}`}
            src={screenHome}
            alt=""
            aria-hidden="true"
          />
        </div>
      </div>
      <span className={styles.phoneIsland} aria-hidden="true" />
    </div>
  )
}

function Points({ items }) {
  return (
    <ul className={styles.points}>
      {items.map((text, i) => (
        <li key={i} className={styles.point}>
          <span className={styles.pointDot} aria-hidden="true" />
          <p className={styles.pointText}>{text}</p>
        </li>
      ))}
    </ul>
  )
}

/* Dashed gradient arrow used across the page: #D8D8D8 @50% → #000000, 2px dashed */
const arrowShapes = {
  down:  { box: '0 0 180 100', line: 'M2 2 C 18 44, 60 56, 108 63 S 160 80, 168 92', head: 'M160 88 L 172 97 L 170 83 Z', grad: [0, 0, 180, 100] },
  // Mobile: rises from Tosin (bottom) up to her words (top)
  rise:  { box: '0 0 60 80',   line: 'M44 78 C 52 58, 40 40, 30 28 S 18 14, 16 9',     head: 'M10 13 L 13 1 L 22 10 Z', grad: [44, 78, 13, 1] },
  curlUp:{ box: '0 0 130 50',  line: 'M2 40 C 30 52, 70 50, 96 30 S 114 18, 118 14',  head: 'M111 12 L 124 8 L 119 21 Z', grad: [0, 40, 124, 10] },
}

function DashedArrow({ className, id, shape = 'down' }) {
  const a = arrowShapes[shape]
  return (
    <svg className={className} viewBox={a.box} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1={a.grad[0]} y1={a.grad[1]} x2={a.grad[2]} y2={a.grad[3]} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D8D8D8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
      </defs>
      <path d={a.line} stroke={`url(#${id})`} strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
      <path d={a.head} fill="#000000" />
    </svg>
  )
}

function Pill({ children }) {
  return <li className={styles.pill}>{children}</li>
}

// Matches the arrow-right icon used in the "Next project" link on the
// MailMint case study page.
function ArrowRightIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

function ChevronIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  )
}

/* ───────── Technical section: four case files, collapsed by default ─────────
   Content ported unchanged from the portfolio's existing Poise write-up. */
const caseFiles = [
  {
    title: 'The crash that predated every commit',
    body: [
      "Expo Go crashed on my iPhone at about 100% load, before any of my changes ran. I bisected the git history back to the original checkpoint and ruled out the font file, the image upload code, and the generation function.",
      "My first theory was an iOS 26 pointer-authentication bug. Wrong: the phone was on iOS 18.3.1. The real cause was a patch-level mismatch: the project declared react-native-worklets 0.10.0 and reanimated 4.5.0, while the installed Expo Go shipped 0.10.1 and 4.5.1. Aligning the versions fixed it.",
    ],
  },
  {
    title: "When the AI's citations didn't check out",
    body: [
      "While debugging, my coding assistant cited specific GitHub issue numbers I couldn't find, at least twice. I verified each claim independently before acting on it. When a later claim came with raw HTTP evidence I could reproduce myself, I accepted it.",
    ],
  },
  {
    title: 'The password-reset link that only worked half the time',
    body: [
      "The reset email kept redirecting to the wrong address, even though the URL was on Supabase's allowlist. Testing the live endpoint with controlled values showed why: Supabase rejects any redirect whose host is an IP address before it even checks the allowlist.",
      'exp://172.20.10.5 was rejected, exp://127.0.0.1 passed, and a real hostname passes. It only affected testing from a phone against my own machine. Production was unaffected.',
    ],
  },
  {
    title: 'The onboarding screen that flashed and vanished',
    body: [
      'The router decided whether onboarding was done before the profile had finished loading, so it briefly read "not done" and then corrected itself. Adding a fetched flag so it waits for real data before deciding fixed the race.',
    ],
  },
]

function CaseFile({ title, body }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.caseFile}>
      <button
        type="button"
        className={styles.caseFileHeader}
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span className={styles.caseFileTitle}>{title}</span>
        <ChevronIcon className={`${styles.caseFileChevron} ${open ? styles.caseFileChevronOpen : ''}`} />
      </button>
      {open && (
        <div className={styles.caseFileBody}>
          {body.map((p, i) => <p key={i}>{p}</p>)}
        </div>
      )}
    </div>
  )
}

export default function Poise() {
  return (
    <>
      <div className={styles.header}>
        <Navbar />
      </div>

      <main className={styles.main}>
        <article className={styles.content}>
          {/* ───────────── HERO ───────────── */}
          <section className={styles.hero} aria-label="Poise case study">
            <h1 className={styles.visuallyHidden}>Poise</h1>

            <div className={styles.heroStage}>
              <ul className={`${styles.pillGroup} ${styles.pillsLeft}`} aria-label="Role and timeline">
                {roleTags.map((t) => <Pill key={t}>{t}</Pill>)}
              </ul>

              <ul className={`${styles.pillGroup} ${styles.pillsCenter}`} aria-label="Project type">
                <Pill>Web prototype</Pill>
              </ul>

              <ul className={`${styles.pillGroup} ${styles.pillsRight}`} aria-label="Tools">
                {toolTags.map((t) => <Pill key={t}>{t}</Pill>)}
              </ul>

              <div className={styles.heroArt}>
              {/* Big faded "Poise" (SOONER) — drawn as a gradient masked by the wordmark */}
              <div
                className={styles.heroWordmark}
                style={{ '--wordmark': `url(${poiseWordmark})` }}
                aria-hidden="true"
              />

              <img
                className={styles.heroPhone}
                src={heroPhone}
                alt="Poise Home screen showing today's AI-styled outfit"
              />
              </div>
            </div>

            <img className={styles.clothesRack} src={clothesRack} alt="" aria-hidden="true" />
          </section>

          {/* ───────────── WHAT EVEN IS POISE? ───────────── */}
          <section className={styles.about}>
            <h2 className={styles.sectionTitle}>What even is <span className={styles.nowrap}>Poise? <span className={styles.emoji}>🧐</span></span></h2>

            <Points items={aboutPoints} />

            <div className={styles.noteRow}>
              <DashedArrow className={styles.aboutArrow} id="aboutArrowStroke" />
              <p className={`${styles.handNote} ${styles.aboutNote}`}>
                You already own the clothes. Poise does the styling.<br />
                Cool right?<span className={styles.emoji}>😎</span>
              </p>
            </div>
          </section>

          {/* ───────────── QUOTE ───────────── */}
          <figure className={styles.quoteBlock}>
            <img className={styles.quoteImage} src={quoteWardrobe} alt="" aria-hidden="true" />
            <img className={`${styles.quoteImage} ${styles.quoteBlur}`} src={quoteWardrobe} alt="" aria-hidden="true" />
            <div className={styles.quoteShade} aria-hidden="true" />
            <blockquote className={styles.quoteText}>
              “I normally have to plan my work outfits weeks before because it is really time consuming trying to look for clothes to wear”.
            </blockquote>
          </figure>

          {/* ───────────── SO WHAT'S THE PROBLEM? ───────────── */}
          <section className={styles.problem}>
            <h2 className={styles.sectionTitle}>So what's the <span className={styles.nowrap}>problem?<span className={styles.emoji}>🤔</span></span></h2>
            <p className={styles.sectionSubtitle}>Why does a full closet still feel like you have nothing to wear?</p>
            <Points items={problemPoints} />
          </section>

          {/* ───────────── WHERE DID THIS COME FROM? ───────────── */}
          <section className={styles.origin}>
            <h2 className={styles.sectionTitle}>Where did this actually come from?</h2>
            <div className={styles.originBody}>
              <span className={styles.originBar} aria-hidden="true" />
              <p className={styles.originText}>
                This wasn't a formal study. It started as a conversation with a close friend about her week. She's a remote executive assistant, on call well past clock-out whenever her boss needs her. What I heard from her is what I already knew from my own closet.
              </p>
            </div>
          </section>

          {/* ───────────── PERSONA ───────────── */}
          <section className={styles.persona} aria-label="Persona: Tosin Coker">
            <div className={styles.personaCard}>
              <div className={styles.personaArt}>
                <img className={styles.personaImage} src={tosinCoker} alt="Illustration of Tosin, resting her chin on her hand and thinking" />
                <p className={`${styles.handNote} ${styles.personaQuote}`}>
                  Sometimes I'm going through my closet and I find something and I'm like wait, is this even mine?.<br />
                  so many clothes i don’t even know what i have <span className={styles.emoji}>😩</span>
                </p>
                <DashedArrow className={styles.personaArrow} id="personaArrowStroke" shape="curlUp" />
                <DashedArrow className={styles.personaArrowMobile} id="personaArrowStrokeMobile" shape="rise" />
              </div>

              <div className={styles.personaInfo}>
                <h3 className={styles.personaName}>Tosin Coker</h3>
                <span className={styles.personaRole}>The Executive Assistant</span>
                <ul className={styles.personaPoints}>
                  {personaPoints.map((pt) => (
                    <li key={pt.title} className={styles.personaPoint}>
                      <span className={styles.personaIcon}><HugeIcon name={pt.icon} /></span>
                      <p><strong>{pt.title}</strong> {pt.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className={`${styles.handNote} ${styles.personaCaption}`}>
              An informal conversation with a close friend, plus my own daily experience picking outfits
            </p>
          </section>

          {/* ───────────── SO WHAT DID I BUILD? ───────────── */}
          <section className={styles.build}>
            <h2 className={styles.sectionTitle}>So what did I <span className={styles.nowrap}>build? <span className={styles.emoji}>😌</span></span></h2>

            <div className={styles.features}>
              <div className={styles.feature}>
                <div className={styles.featureText}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  <p className={styles.pointText}><strong>Log your wardrobe once.</strong> No more forgetting what you own. Every piece lives in one place, ready whenever you need it.</p>
                </div>
                <div className={styles.featureMedia}>
                  <PhoneVideo src={logWardrobeVideo} poster={logWardrobePoster} label="Screen recording: adding a piece to the Poise wardrobe" />
                </div>
              </div>

              <div className={`${styles.feature} ${styles.featureFlip}`}>
                <div className={styles.featureText}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  <p className={styles.pointText}>An outfit, already decided. No planning weeks ahead. Poise builds it for you, so the decision never has to happen.</p>
                </div>
                <div className={styles.featureMedia}>
                  <PhoneShot src={heroPhone} alt="Poise Home screen with today's outfit ready" />
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureText}>
                  <span className={styles.pointDot} aria-hidden="true" />
                  <p className={styles.pointText}>Not feeling it? Skip. One tap, and it's a different combination. No settling, no starting over.</p>
                </div>
                <div className={styles.featureMedia}>
                  <PhoneVideo src={refreshOutfitVideo} poster={refreshOutfitPoster} label="Screen recording: tapping refresh to get a different outfit" />
                </div>
              </div>
            </div>
          </section>

          {/* ───────────── POISE WASN'T ALWAYS POISE ───────────── */}
          <section className={styles.pivot}>
            <h2 className={styles.sectionTitle}>Poise wasn't always <span className={styles.nowrap}>Poise. <span className={styles.emoji}>👀</span></span></h2>
            <div className={styles.pivotText}>
              <p>Before it was Poise, it was Drip. And Drip tried to do everything; a Discover feed, follow and like and comment, creator profiles, a feature that recreated other people's outfits, notifications, weather-aware styling, an AI that learned your preferences over time.</p>
              <p>All of that collapsed the project before it ever worked. So I cut it back to the one thing that actually mattered: can this help someone decide what to wear, using only what they already own? Everything else came out. What was left became the version you're looking at now.</p>
              <p>Along the way, the name changed too, from Drip to Poise.</p>
            </div>
          </section>

          {/* ───────────── SO HERE'S WHAT IT ACTUALLY LOOKS LIKE ───────────── */}
          <section className={styles.screens} aria-label="Product screens">
            <h2 className={styles.sectionTitle}>So here's what it actually looks <span className={styles.nowrap}>like <span className={styles.emoji}>✨</span></span></h2>
            <div className={styles.marqueeRows}>
              <ScreenMarquee items={screensTop} direction="right" />
              <ScreenMarquee items={screensBottom} direction="left" />
            </div>
          </section>

          {/* ───────────── TECHNICAL SECTION ───────────── */}
          <section className={styles.technical} aria-label="Technical problem solving">
            <h2 className={styles.sectionTitle}>What broke, and how I found it</h2>
            <div className={styles.caseFileList}>
              {caseFiles.map((c) => (
                <CaseFile key={c.title} title={c.title} body={c.body} />
              ))}
            </div>
          </section>

          {/* ───────────── LIVE DEMO ───────────── */}
          <section className={styles.demo} aria-label="Live demo">
            <h2 className={styles.sectionTitle}>
              Go ahead, poke around. It's <span className={styles.nowrap}>real <span className={styles.emoji}>👀</span></span><br />
              No login needed. Just play with <span className={styles.nowrap}>it <span className={styles.emoji}>😌</span></span>
            </h2>

            <div className={styles.demoStage}>
              <DemoPhone />

              <div className={styles.demoNoteWrap}>
                <DashedArrow className={styles.demoArrow} id="demoArrowStroke" shape="curlUp" />
                <DashedArrow className={styles.demoArrowMobile} id="demoArrowStrokeMobile" shape="down" />
                <p className={`${styles.handNote} ${styles.demoNote}`}>
                  <strong>Yes, it looks a little different. <span className={styles.emoji}>👀</span></strong><br />
                  In the designs, Poise styles every outfit on a faceless mannequin shaped to your body type. In version one, your outfit comes together as a flat lay of your own pieces. Generating mannequins that fit each body and faithfully show your actual clothes takes serious compute and budget, so I scoped it out to ship the core experience first. The vision hasn't changed. It's just next.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>

      <footer className={styles.footer}>
        {/* Next project in the portfolio's order after Poise: Cove. */}
        <a href="#/projects/cove" className={styles.nextCta} aria-label="Next project">
          <span className={styles.nextCtaLabel}>NEXT PROJECT</span>
          <span className={styles.nextCtaName}>
            Next Project <ArrowRightIcon className={styles.nextCtaArrow} />
          </span>
        </a>
      </footer>
    </>
  )
}
