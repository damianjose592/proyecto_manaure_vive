import '../../styles/inicio/Contacto.css';

const WHATSAPP_URL =
  'https://wa.me/573012706114?text=Hola%20Manaure%20Vive%2C%20vi%20la%20secci%C3%B3n%20de%20contacto%20en%20su%20web%20y%20quiero%20consultar%20disponibilidad.';

function Contacto() {
  return (
    <section className="contacto section-ecoturismo" id="contacto" data-reveal="section">
      <div className="contacto-grid">
        <div data-reveal="content">
          <span className="contacto-eyebrow">Reservas y contacto</span>
          <h2 className="contacto-title">Escríbenos, te respondemos rápido</h2>
          <p className="contacto-sub">
            Reserva directa por WhatsApp o teléfono. Nuestro equipo te ayuda a armar
            el plan según tu grupo, fecha y presupuesto.
          </p>

          <div className="contacto-filas">
            <a className="contacto-fila" href="tel:+573012706114">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <div>
                <p className="contacto-fila-label">Teléfono</p>
                <p className="contacto-fila-valor">+57 301 270 6114</p>
              </div>
            </a>

            <a className="contacto-fila" href="mailto:reservas@villamartha.com.co">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
              </svg>
              <div>
                <p className="contacto-fila-label">Correo</p>
                <p className="contacto-fila-valor">reservas@villamartha.com.co</p>
              </div>
            </a>

            <div className="contacto-fila">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div>
                <p className="contacto-fila-label">Dirección</p>
                <p className="contacto-fila-valor">Finca Villa Adelaida · Manaure, Balcón del Cesar, Cesar</p>
              </div>
            </div>
          </div>

          <a
            className="contacto-whatsapp-outline"
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            </svg>
            Reservar por WhatsApp
          </a>
        </div>

        <div data-reveal="content">
          <div className="contacto-mapa">
            <iframe
              title="Ubicación de la Finca Villa Adelaida en Manaure, Cesar"
              src="https://www.google.com/maps?q=Manaure,+Cesar,+Colombia&z=13&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contacto;
