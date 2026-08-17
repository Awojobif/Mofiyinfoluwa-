import { useState, useEffect } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Hero from '../../components/Hero/Hero';
import FeaturedWorks from '../../components/FeaturedWorks/FeaturedWorks';
import AboutPreview from '../../components/AboutPreview/AboutPreview';
import Contact from '../../components/Contact/Contact';
import Footer from '../../components/Footer/Footer';

const STACKED_QUERY = '(max-width: 992px)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

const Home = () => {
  const isStacked = useMediaQuery(STACKED_QUERY);

  return (
    <div className={styles.homeLayout}>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.mainContainer}>
        <aside className={styles.leftColumn}>
          <ProfileCard musicPlayer={isStacked ? <MusicPlayer /> : null} />
          {!isStacked && <MusicPlayer />}
        </aside>

        <section className={styles.rightColumn}>
          <div className={`${styles.blob} ${styles.blob1}`} aria-hidden="true"></div>
          <div className={`${styles.blob} ${styles.blob2}`} aria-hidden="true"></div>
          <div className={`${styles.blob} ${styles.blob3}`} aria-hidden="true"></div>
          <div className={`${styles.blob} ${styles.blob4}`} aria-hidden="true"></div>
          <div className={`${styles.blob} ${styles.blob5}`} aria-hidden="true"></div>
          <Hero />
          <FeaturedWorks />
          <AboutPreview />
          <Contact />
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;
