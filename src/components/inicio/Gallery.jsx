import '../../styles/inicio/Gallery.css';
import { FOTOS_GALERIA } from '../../utils/inicio/Galeria.utils';

function Gallery({ onAbrirFoto }) {
  const fotosVistaPrevia = FOTOS_GALERIA.slice(0, Math.ceil(FOTOS_GALERIA.length * 0.4));

  return (
    <section className="gallery section-ecoturismo" id="destinos" data-reveal="section">
      <div className="gallery-head" data-reveal="heading">
        <div>
          <span className="eyebrow">GALERÍA</span>
          <h2>Conoce Manaure</h2>
          <p>Imágenes que cuentan historias, paisajes que inspiran y experiencias que se quedan en el corazón.</p>
        </div>
        <a href="#galeria">Ver galería <span aria-hidden="true">→</span></a>
      </div>

      <div className="gallery-grid">
        {fotosVistaPrevia.map((item, index) => (
          <button
            key={item.imagen}
            type="button"
            className="gallery-item-button"
            onClick={() => onAbrirFoto?.(FOTOS_GALERIA.findIndex(foto => foto.imagen === item.imagen))}
            aria-label={`Abrir galería: ${item.alt}`}
            data-reveal="item"
          >
            <img src={item.imagen} alt={item.alt} loading="lazy" />
          </button>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
