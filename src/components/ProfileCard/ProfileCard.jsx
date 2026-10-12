import { useState } from 'react';
import styles from './ProfileCard.module.css';
import mofiyin from '../../assets/Mofiyin.png';

const ProfileCard = ({ musicPlayer }) => {
  const [open, setOpen] = useState(false);
  const hasMusic = Boolean(musicPlayer);

  return (
    <div className={styles.card}>
      <div className={styles.topSection}>
        <img src={mofiyin} alt="Mofiyin Awojobi" className={styles.imagePlaceholder} />
        <div className={styles.info}>
          <h2 className={styles.name}>Mofiyinfoluwa (Fiyin) Awojobi</h2>
          <p className={styles.title}>Product Designer</p>
          <div className={styles.status}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>Open to new opportunities</span>
          </div>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottomSection}>
        <div className={styles.contactGroup}>
          <span className={styles.contactLabel}>Contact me</span>
          <div className={styles.socials}>
            <a href="https://www.linkedin.com/in/creativeformina/" target="_blank" rel="noopener noreferrer" className={styles.icon}>in</a>
            <a href="https://www.behance.net/fiyinfoluwaAJ" target="_blank" rel="noopener noreferrer" className={styles.icon}>Be</a>
            <a href="mailto:awojobifiyin@gmail.com" className={styles.icon}>@</a>
          </div>
        </div>
        <a href="/Fiyin_Awojobi_Resume.pdf" target="_blank" rel="noreferrer" className={styles.resumeBtn}>View my resume <span className={styles.arrow}>↗</span></a>
      </div>

      {hasMusic && (
        <>
          <div className={styles.seeMoreRow}>
            <button
              type="button"
              className={styles.seeMore}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
            >
              {open ? 'See less' : 'See more'}
            </button>
          </div>
          <div className={`${styles.expandRegion} ${open ? styles.expandOpen : ''}`}>
            <div className={styles.expandInner}>{musicPlayer}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileCard;
