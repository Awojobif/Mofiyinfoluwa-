import { useRef, useEffect } from 'react';
import styles from './FeaturedWorks.module.css';
import mailmintHero from '../../assets/Mailmint hero.webp';

const FeaturedWorks = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const compute = () => {
      if (scrollRef.current) {
        const rect = scrollRef.current.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        let p = maxScroll > 0 ? -rect.top / maxScroll : 0;
        p = Math.max(0, Math.min(1, p));

        // Spread the transition over a much wider scroll threshold for smooth fluid easing
        const p1 = Math.min(1, Math.max(0, p / 0.7));
        const p2 = Math.min(1, Math.max(0, (p - 0.3) / 0.7));

        scrollRef.current.style.setProperty('--op1', (1 - p1).toFixed(3));
        scrollRef.current.style.setProperty('--y1', `${(p1 * -40).toFixed(1)}px`);
        scrollRef.current.style.setProperty('--s1', (1 - p1 * 0.03).toFixed(3));

        scrollRef.current.style.setProperty('--op2', p2.toFixed(3));
        scrollRef.current.style.setProperty('--y2', `${((1 - p2) * 40).toFixed(1)}px`);
        scrollRef.current.style.setProperty('--pe2', p2 > 0.5 ? 'auto' : 'none');
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
            <div className={`${styles.projectCard} ${styles.dripBg}`}>
              <div className={`${styles.projectContent} ${styles.darkText}`}>
                <div className={`${styles.projectNumber} ${styles.blueColor}`}>02</div>
                <h3 className={styles.projectTitle}>Drip</h3>
                <p className={styles.projectDesc}>
                  An AI-powered personal style assistant providing curated wardrobe analytics, onboarding flows, and bespoke styling choices.
                </p>
                <a href="#" className={styles.cta}>View case study <span className={styles.arrow}>↗</span></a>
              </div>
              <div className={styles.projectVisual}>
                <div className={styles.imageMockupDark}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWorks;
