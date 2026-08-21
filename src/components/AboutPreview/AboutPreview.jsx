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
            I&apos;m a product designer who moved into tech from an unlikely place, banking. I spent about a year working directly with customers as an intern, first in customer support, then in card operations, which is where I actually learned to pay attention to how people get confused, what makes them hesitate, and what they need to hear to trust something new. I didn&apos;t know it at the time, but that was my first real design education.
          </p>
          <p>
            I studied Mass Communication at university, then found my way into product design through a bootcamp that turned into something bigger. I led design for MailMint, an AI cold email platform, within a 16-person team, structuring the product through research and documentation, shaping the UX for onboarding and authentication, and working closely with AI tools throughout the build. It taught me that design decisions happen long before anything reaches a screen.
          </p>
          <p>
            Right now I&apos;m building Drip, a smart wardrobe app, designed the more traditional way, in Figma, screen by screen, before a single line of code. Between the two projects, I&apos;ve gotten to work across the full range of how design actually gets made today, from documentation-driven, AI-assisted builds to hands-on visual design.
          </p>
          <p>
            What ties it together for me is the same thing that stuck from my banking days: paying close attention to what confuses people, and designing that confusion away.
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
