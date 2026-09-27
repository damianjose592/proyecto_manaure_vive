import { useState, useEffect, useCallback } from 'react';
import '../../styles/inicio/Hero.css';
import { INTERVAL, slides } from '../../utils/inicio/Hero.utils';

function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((idx) => {
    if (animating) return;
    setPrev(current);
    setAnimating(true);
    setCurrent(idx);
    window.setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900);
  }, [current, animating]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  useEffect(() => {
    const id = window.setInterval(next, INTERVAL);
    return () => window.clearInterval(id);
  }, [next]);

  return (
    <section className="hero" id="inicio">
      {slides.map((slide, index) => (
        <div
          key={slide.label}
          className={`hero-bg ${index === current ? 'hero-bg--active' : ''} ${index === prev ? 'hero-bg--exit' : ''}`}
          style={{ backgroundImage: `url(${slide.img})` }}
        />
      ))}

      <div className="hero-overlay" />

      <div className="hero-content">
        <p className="eyebrow">MANAURE VIVE</p>
        <h1>Naturaleza, cultura,
          gastronomía y experiencias<br /></h1>
        <p>que conectan con el territorio.</p>
        <div className="hero-actions">
          <a className="btn btn-primary" href="#descubre">Explorar experiencias <span aria-hidden="true">→</span></a>
          <a className="btn btn-ghost" href="#paquetes-todos">Ver paquetes <span aria-hidden="true">→</span></a>
        </div>
      </div>

      <div className="hero-slogan"><span className="slogan-line">¡Vive lo</span><br /><b>extraordinario!</b></div>

      <div className="hero-dots" aria-label="Slides del hero">
        {slides.map((slide, index) => (
          <button
            key={slide.label}
            className={`hero-dot${index === current ? ' active' : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="hero-progress">
        <div key={current} className="hero-progress-bar" style={{ animationDuration: `${INTERVAL}ms` }} />
      </div>
    </section>
  );
}

export default Hero;
