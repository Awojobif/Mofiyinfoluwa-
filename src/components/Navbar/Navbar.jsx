import { useState } from 'react';
import styles from './Navbar.module.css';
import logo from '../../assets/Header logo copy 1.svg';

const NAV_LINKS = [
  { href: '/#work', label: 'Work' },
  { href: '/#about', label: 'About' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <a href="/" className={styles.logoLink} aria-label="Back to portfolio homepage">
            <img src={logo} alt="Portfolio logo" className={styles.logoMark} />
          </a>
        </div>

        <div className={styles.links}>
          <a href="/#work" className={styles.link}>Work</a>
          <a href="/#about" className={styles.link}>About</a>
        </div>

        <button
          type="button"
          className={styles.hamburger}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`${styles.bar} ${menuOpen ? styles.barTop : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barMid : ''}`} />
          <span className={`${styles.bar} ${menuOpen ? styles.barBot : ''}`} />
        </button>
      </nav>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        onClick={closeMenu}
      >
        <div className={styles.mobileMenuInner} onClick={(e) => e.stopPropagation()}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;
