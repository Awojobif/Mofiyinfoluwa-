import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          <span className={styles.purple}>Hey!</span> I&apos;m Fiyin, I lead product design from idea to MVP.
        </h1>
        <p className={styles.subtext}>
          I use AI throughout my design and development workflow to explore ideas, solve problems, and turn concepts into working products. I led a 16-person team through the design and AI-assisted development of MailMint, an AI email platform.
        </p>
      </div>
    </section>
  );
};

export default Hero;
