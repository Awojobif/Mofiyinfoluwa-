import { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    const root = document.documentElement;
    root.classList.add(styles.rootActive);

    const cursorEl = cursorRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const purple =
      getComputedStyle(root).getPropertyValue('--color-purple').trim() || '#7C5CFA';
    const lavender = '#B9A8FF';

    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    const resize = () => {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = cssW + 'px';
      canvas.style.height = cssH + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    let mouseX = cssW / 2;
    let mouseY = cssH / 2;
    let curX = mouseX;
    let curY = mouseY;
    let lastSpawnX = mouseX;
    let lastSpawnY = mouseY;
    let shown = false;

    const particles = [];
    const MAX_PARTICLES = 140;
    const SPAWN_DISTANCE = 14;

    const rand = (min, max) => min + Math.random() * (max - min);

    const spawnParticle = (x, y) => {
      const star = Math.random() < 0.08;
      particles.push({
        x: x + rand(-3, 3),
        y: y + rand(-3, 3),
        vx: rand(-0.3, 0.3),
        vy: rand(-0.5, -0.05),
        life: 1,
        decay: rand(0.02, 0.05),
        size: star ? rand(2.5, 4) : rand(0.8, 2.2),
        star,
        color: Math.random() < 0.5 ? purple : lavender,
      });
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!shown && cursorEl) {
        cursorEl.style.opacity = '1';
        shown = true;
      }
      const dx = mouseX - lastSpawnX;
      const dy = mouseY - lastSpawnY;
      if (Math.hypot(dx, dy) > SPAWN_DISTANCE && Math.random() < 0.6) {
        spawnParticle(mouseX, mouseY);
        lastSpawnX = mouseX;
        lastSpawnY = mouseY;
      }
    };

    const onLeave = () => {
      if (cursorEl) cursorEl.style.opacity = '0';
      shown = false;
    };

    const drawStar = (p) => {
      ctx.globalAlpha = p.life * 0.6;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = Math.max(0.6, p.size * 0.4);
      const r = p.size * 1.4;
      ctx.beginPath();
      ctx.moveTo(p.x, p.y - r);
      ctx.lineTo(p.x, p.y + r);
      ctx.moveTo(p.x - r, p.y);
      ctx.lineTo(p.x + r, p.y);
      ctx.stroke();
    };

    let raf;
    const frame = () => {
      curX += (mouseX - curX) * 0.35;
      curY += (mouseY - curY) * 0.35;
      if (cursorEl) {
        cursorEl.style.transform = `translate3d(${curX - 3}px, ${curY - 2}px, 0)`;
      }

      ctx.clearRect(0, 0, cssW, cssH);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 1.5;
        if (p.star) {
          drawStar(p);
        } else {
          ctx.globalAlpha = p.life * 0.5;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      root.classList.remove(styles.rootActive);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
        <svg className={styles.arrow} width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M3 2L3 21L7.2 16.8L10 22L12.2 21L9.4 15.8L15 15.8L3 2Z"
            fill="var(--color-purple)"
            stroke="#ffffff"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );
}
