import { useRef, useEffect } from 'react';
import styles from './FeaturedWorks.module.css';
import mailmintHero from '../../assets/Mailmint hero.webp';
import poiseMockup from '../../assets/poise-phone-clean.png';

const FeaturedWorks = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Timeline: HOLD → TRANSITION → HOLD, as a fraction of the pinned scroll
    // range. MailMint stays fully settled (opacity pinned at exactly 1),
    // eases out as Poise eases in, then Poise stays fully settled for the
    // rest of the scroll.
    const TRANSITION_START = 0.45;
    const TRANSITION_END = 0.54;

    const smoothstep = (edge0, edge1, x) => {
      const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
      return t * t * (3 - 2 * t);
    };

    const compute = () => {
      if (scrollRef.current) {
        const rect = scrollRef.current.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        let p = maxScroll > 0 ? -rect.top / maxScroll : 0;
        p = Math.max(0, Math.min(1, p));

        const t1 = smoothstep(TRANSITION_START, TRANSITION_END, p);

        scrollRef.current.style.setProperty('--op1', (1 - t1).toFixed(3));
        scrollRef.current.style.setProperty('--y1', `${(t1 * -40).toFixed(1)}px`);
        scrollRef.current.style.setProperty('--s1', (1 - t1 * 0.03).toFixed(3));

        scrollRef.current.style.setProperty('--op2', t1.toFixed(3));
        scrollRef.current.style.setProperty('--y2', `${((1 - t1) * 40).toFixed(1)}px`);
        scrollRef.current.style.setProperty('--pe2', t1 > 0.5 ? 'auto' : 'none');
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(compute);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.scrollSection} id="work" ref={scrollRef}>
      <div className={styles.stickyWrapper}>
        <div className={styles.header}>
          <span className={styles.label}>
            <span className={styles.dot}></span> FEATURED WORKS <span className={styles.dot}></span>
          </span>
        </div>

        <div className={styles.projects}>
          {/* Project 01 */}
          <div className={`${styles.projectCardContainer} ${styles.card1}`}>
            <div className={`${styles.projectCard} ${styles.mailmintCard} ${styles.mailmintBg}`}>
              <div className={styles.projectContent}>
                <div className={styles.projectNumber}>01</div>
                <h3 className={styles.projectTitle}>Mailmint</h3>
                <p className={styles.projectDesc}>
                  An AI-powered email marketing platform designed to simplify campaign creation, onboarding, automation and analytics for modern businesses.
                </p>
                <a href="#/projects/mailmint" className={styles.cta}>View case study <span className={styles.arrow}>↗</span></a>
              </div>
              <div className={styles.projectVisual}>
                <img
                  src={mailmintHero}
                  alt="MailMint – AI email marketing platform"
                  className={styles.mailmintHeroImg}
                />
              </div>
            </div>
          </div>

          {/* Project 02 */}
          <div className={`${styles.projectCardContainer} ${styles.card2}`}>
            <div className={`${styles.projectCard} ${styles.poiseBg}`}>
              <div className={styles.projectContent}>
                <div className={`${styles.projectNumber} ${styles.blueColor}`}>02</div>
                <h3 className={styles.poiseTitle}>Poise</h3>
                <p className={styles.projectDesc}>
                  An AI wardrobe app that turns clothes you already own into daily outfit combinations.
                </p>
                <a href="#/projects/poise" className={`${styles.cta} ${styles.poiseCta}`}>View case study <span className={styles.arrow}>↗</span></a>
              </div>
              <div className={styles.projectVisual}>
                <img
                  src={poiseMockup}
                  alt="Poise – AI wardrobe app"
                  className={styles.poiseMockupImg}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
