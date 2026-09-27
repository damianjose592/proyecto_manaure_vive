import '../../styles/layout/WhatsAppButton.css';

const WHATSAPP_URL = 'https://wa.me/573012706114';

function WhatsAppButton() {
  return (
    <a
      className="whatsapp-floating-button"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="¿Necesitas ayuda? Escríbenos"
    >
      <span className="whatsapp-tooltip" role="tooltip">¿Necesitas ayuda? Escríbenos</span>
      <svg className="whatsapp-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
        <path d="M16 3.2a12.7 12.7 0 0 0-10.9 19.2L3.4 28.8l6.6-1.7A12.8 12.8 0 1 0 16 3.2Z" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    </a>
  );
}

export default WhatsAppButton;
