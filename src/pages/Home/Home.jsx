import styles from './Home.module.css';
import Navbar from '../../components/Navbar/Navbar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import MusicPlayer from '../../components/MusicPlayer/MusicPlayer';
import Hero from '../../components/Hero/Hero';
import FeaturedWorks from '../../components/FeaturedWorks/FeaturedWorks';
import AboutPreview from '../../components/AboutPreview/AboutPreview';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div className={styles.homeLayout}>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.mainContainer}>
        <aside className={styles.leftColumn}>
          <ProfileCard musicPlayer={<MusicPlayer />} />
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
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default Home;
