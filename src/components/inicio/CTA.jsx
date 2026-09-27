import '../../styles/inicio/CTA.css';
import { paisajeUrl } from '../../utils/inicio/CTA.utils';

function CTA() {
  return (
    <section className="cta" id="reserva" data-reveal="section" style={{ '--cta-image': `url("${paisajeUrl}")` }}>
      <div className="cta-slogan">¡Tu próxima<br /><b>aventura te espera!</b></div>
      <div className="cta-copy">
        <h2>¿Listo para vivir Manaure?</h2>
        <p>Explora, disfruta y apoya el talento local.</p>
      </div>
      <a className="btn btn-primary whatsapp" href="https://wa.me/573012706114" target="_blank" rel="noopener noreferrer">
        <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
          <path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 28.8l6.6-1.7A12.8 12.8 0 1 0 16 3.2Z" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        Reservar por WhatsApp
      </a>
    </section>
  );
}

export default CTA;
