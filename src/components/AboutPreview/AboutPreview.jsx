import styles from './AboutPreview.module.css';
import mofiyin from '../../assets/Mofiyin.png';

const AboutPreview = () => {
  return (
    <section className={styles.section} id="about">
      <div className={styles.header}>
        <span className={styles.label}>
          <span className={styles.dot}></span> ABOUT ME <span className={styles.dot}></span>
        </span>
      </div>

      <div className={styles.content}>
        <div className={styles.titleArea}>
          <h2 className={styles.heading}>
            I did not start in design, <span className={styles.purple}>I started with people</span>
          </h2>
          <img src={mofiyin} alt="Mofiyin Awojobi" className={styles.avatarPlaceholder} />
        </div>

        <div className={styles.story}>
          <p>
            I didn&apos;t start in tech; I started by serving people.<br />
            My journey began in customer service, where I learned how to listen, understand needs, and solve real human problems. That experience shaped how I think about products today, not just as interfaces, but as tools that genuinely help people.
          </p>
          <p>
            That curiosity led me into UX design, where I began translating user needs into digital experiences. As I grew, I moved beyond just designing screens into thinking about how products actually work, scale, and get built.
          </p>
          <p>
            Today, I work as a Product Engineer. Bridging design and development to bring ideas to life. I combine product thinking, frontend systems, and AI-assisted workflows to design and ship products that are not only functional, but intentional and scalable.
          </p>
          <p>
            For me, it&apos;s still the same foundation: understanding people, solving problems, and building things that make sense.
          </p>
          <p className={styles.certification}>
            Certified in Product Design &amp; Development
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
