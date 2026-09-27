import { useState } from 'react';
import '../../styles/inicio/Featured.css';
import { paquetesEcoturismo } from '../../utils/inicio/Ecoturismo.utils';

const ESTRELLAS_POR_DEFECTO = 5;

function PaquetesCompleta({ onVerDetalle }) {
  const [favoritos, setFavoritos] = useState(() => new Set());

  const alternarFavorito = titulo => {
    setFavoritos(prev => {
      const next = new Set(prev);
      if (next.has(titulo)) next.delete(titulo);
      else next.add(titulo);
      return next;
    });
  };

  return (
    <section className="featured section-ecoturismo catalogo-paquetes" id="paquetes-todos" data-reveal="section">
      <a href="#paquetes" className="detalle-back">&larr; Volver a paquetes</a>
      <div className="featured-title" data-reveal="heading">
        <div>
          <span className="eyebrow">CAT&Aacute;LOGO COMPLETO</span>
          <h2>Todos los paquetes disponibles</h2>
          <p>Explora las {paquetesEcoturismo.length} experiencias que Manaure tiene para ti.</p>
        </div>
      </div>

      <div className="featured-cards">
        {paquetesEcoturismo.map(paquete => {
          const indice = paquetesEcoturismo.indexOf(paquete);
          const estrellas = paquete.estrellas || ESTRELLAS_POR_DEFECTO;
          const esFavorito = favoritos.has(paquete.titulo);
          return (
            <article className="featured-card featured-click" key={paquete.titulo} data-reveal="item" onClick={() => onVerDetalle(indice)}>
              <div className="featured-media">
                <img src={paquete.imagen} alt={paquete.titulo} loading="lazy" />
                <span className="featured-stars" aria-label={`${estrellas} de 5 estrellas`}>
                  {'\u2605'.repeat(estrellas)}{'\u2606'.repeat(5 - estrellas)}
                </span>
                <button
                  type="button"
                  className={`featured-fav${esFavorito ? ' active' : ''}`}
                  onClick={e => { e.stopPropagation(); alternarFavorito(paquete.titulo); }}
                  aria-label="Guardar en favoritos"
                  aria-pressed={esFavorito}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
                </button>
              </div>
              <div className="featured-body">
                <h3>{paquete.titulo}</h3>
                <strong className="featured-price">{paquete.precio ? `Desde ${paquete.precio}` : 'Consultar precio'}</strong>
                <p className="featured-location">
                  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /></svg>
                  {paquete.ubicacion}
                </p>
                <div className="featured-chips">
                  {paquete.incluye.slice(0, 3).map(item => (
                    <span key={item}>{item}</span>
                  ))}
                  {paquete.incluye.length > 3 && <span>+{paquete.incluye.length - 3}</span>}
                </div>
                <div className="featured-foot">
                  <span>{paquete.duracion}</span>
                  <button
                    type="button"
                    className="featured-view-btn"
                    onClick={() => onVerDetalle(indice)}
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default PaquetesCompleta;
