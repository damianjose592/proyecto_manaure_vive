import '../../styles/layout/Footer.css';
import { socialLinks } from '../../utils/layout/Footer.utils';

function Footer() {
  return (
    <footer>
      <div className="footer-main">
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img src={`${process.env.PUBLIC_URL}/assets/brand/logopagina-clean.png`} alt="Manaure Vive" className="footer-logo-img" />
          </div>
          <div>
            <h3>Manaure Ecoturístico</h3>
            <p>Naturaleza · Cultura · Gastronomía · Experiencias</p>
          </div>
        </div>
        <div className="footer-socials">
          <div className="socials">
            <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook de Manaure Vive">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M14 8h3V4h-3c-3.3 0-5 2-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.7.3-1 1-1Z" /></svg>
            </a>
            <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram de Manaure Vive">
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect width="17" height="17" x="3.5" y="3.5" rx="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" /><circle cx="17.4" cy="6.7" r="1" fill="currentColor" /></svg>
            </a>
          </div>
        </div>

        <div className="footer-links">
          <a href="#inicio">Inicio</a>
          <a href="#experiencias">Experiencias</a>
          <a href="#paquetes">Paquetes</a>
          <a href="#galeria">Galería</a>
          <a href="#convenios">Convenios</a>
          <a href="#nosotros">Nosotros</a>
          <a href="#reserva">Contacto</a>
        </div>
      </div>

      <div className="footer-bottom">
        Manaure · Cesar, Colombia <span aria-hidden="true">|</span> © 2026 Manaure Vive. Todos los derechos reservados.
      </div>
    </footer>
  );
}

export default Footer;
