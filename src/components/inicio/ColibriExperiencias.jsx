import { useEffect, useRef, useState } from 'react';
import '../../styles/inicio/ColibriExperiencias.css';

function ColibriExperiencias() {
  const marcoRef = useRef(null);
  const [alto, setAlto] = useState(700);

  useEffect(() => {
    const ajustarAlto = event => {
      if (event.origin !== window.location.origin || event.source !== marcoRef.current?.contentWindow) return;
      if (event.data?.type === 'colibri-prototype:height' && Number.isFinite(event.data.height)) {
        setAlto(Math.max(700, event.data.height));
      }
    };
    window.addEventListener('message', ajustarAlto);
    return () => window.removeEventListener('message', ajustarAlto);
  }, []);

  return (
    <section className="colibri-experiencias" id="experiencias" aria-label="Explora las experiencias de Manaure">
      <iframe
        ref={marcoRef}
        src={`${process.env.PUBLIC_URL}/prototipo-colibri/`}
        title="Pregúntale al Colibrí: experiencias de Manaure"
        loading="lazy"
        style={{ height: `${alto}px` }}
      />
    </section>
  );
}

export default ColibriExperiencias;
