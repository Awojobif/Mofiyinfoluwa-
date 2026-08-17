import { useState } from 'react';
import styles from './Contact.module.css';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xqpzlqdd';

const Contact = () => {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setStatus('submitting');
    setErrorMsg('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        let message = 'Something went wrong. Please try again.';
        try {
          const data = await response.json();
          if (data && data.errors) {
            message = data.errors.map((err) => err.message).join(' ');
          }
        } catch {
          // keep default message
        }
        setErrorMsg(message);
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section className={styles.section} id="contact">
      <div className={styles.header}>
        <span className={styles.label}>
          <span className={styles.dot}></span> LET&apos;S CONNECT <span className={styles.dot}></span>
        </span>
      </div>

      <div className={styles.contactCard}>
        <div className={styles.infoArea}>
          <h2 className={styles.heading}>Let&apos;s work together.</h2>
          <p className={styles.subheading}>Have a project in mind?</p>
        </div>

        <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
          <div className={styles.inputGroup}>
            <input type="text" name="name" placeholder="Your name" className={styles.input} />
            <input type="email" name="email" placeholder="Your email" className={styles.input} />
          </div>
          <input type="text" name="subject" placeholder="Subject" className={styles.input} />

          <div className={styles.messageGroup}>
            <textarea name="message" placeholder="Tell me about your project" className={styles.textarea}></textarea>
            <button type="submit" className={styles.submitBtn} disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending…' : 'Send Message'} <span className={styles.icon}>📋</span>
            </button>
          </div>

          {status === 'submitting' && (
            <p className={styles.statusMsg}>Sending your message…</p>
          )}
          {status === 'success' && (
            <p className={`${styles.statusMsg} ${styles.statusSuccess}`}>
              Thanks! Your message has been sent. I&apos;ll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className={`${styles.statusMsg} ${styles.statusError}`}>{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
