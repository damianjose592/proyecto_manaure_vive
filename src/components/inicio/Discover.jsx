import { useState } from 'react';
import '../../styles/inicio/Discover.css';
import { categoriasEcoturismo } from '../../utils/inicio/Ecoturismo.utils';
import { PAQUETES_DEMO } from './Descubre';

const INTERESES_POR_ORDEN = ['naturaleza', 'aventura', 'fotografia', 'deportes', 'gastronomia', 'cultura'];

function Discover() {
  const [temaIdx, setTemaIdx] = useState(null);
  const temaId = temaIdx === null ? null : INTERESES_POR_ORDEN[temaIdx];
  const categoriaSel = temaIdx === null ? null : categoriasEcoturismo[temaIdx];
  const coinciden = temaId ? PAQUETES_DEMO.filter(p => p.intereses.includes(temaId)) : [];
  return (
    <section className="discover section-ecoturismo" id="experiencias" data-reveal="section">
      <div className="section-head center" data-reveal="heading">
        <span className="eyebrow">¿QUÉ QUIERES HACER?</span>
        <h2>Descubre tu experiencia</h2>
        <p>Usa el buscador y encuentra la aventura perfecta en Manaure.</p>
      </div>

      <div className="circulos-grid" data-reveal="content">
        {categoriasEcoturismo.map((categoria, i) => (
          <button
            type="button"
            className={`circulo-tema${temaIdx === i ? ' active' : ''}`}
            onClick={() => setTemaIdx(temaIdx === i ? null : i)}
            aria-pressed={temaIdx === i}
            key={categoria.nombre}
          >
            <span className="circulo-tema-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {(categoria.icono.rects || []).map((rect, j) => <rect key={`r${j}`} {...rect} />)}
                {(categoria.icono.circles || []).map((circle, j) => <circle key={`c${j}`} {...circle} />)}
                {(categoria.icono.paths || []).map((d, j) => <path key={`p${j}`} d={d} />)}
                {(categoria.icono.acentos || []).map((a, j) => (
                  a.tipo === 'circle'
                    ? <circle key={`a${j}`} cx={a.cx} cy={a.cy} r={a.r} className="acento" />
                    : <path key={`a${j}`} d={a.d} className="acento" />
                ))}
              </svg>
            </span>
            <span className="circulo-tema-nombre">{categoria.nombre}</span>
          </button>
        ))}
      </div>

      {categoriaSel && (
        <div className="temas-resultados" aria-live="polite" data-reveal="content">
          <p className="temas-resultados-titulo">
            {coinciden.length === 1 ? '1 paquete' : `${coinciden.length} paquetes`} de {categoriaSel.nombre}
          </p>
          {coinciden.map(p => (
            <a className="tema-resultado" key={p.titulo} href={`#paquete/${p.paquete}`}>
              <img src={p.imagen} alt={p.titulo} loading="lazy" />
              <span className="tema-resultado-texto">
                <strong>{p.titulo}</strong>
                <em>{p.precio} &middot; {p.base}</em>
              </span>
              <span aria-hidden="true">&rarr;</span>
            </a>
          ))}
        </div>
      )}

      <div className="descubrir-banner" data-reveal="content">
        <div className="descubrir-left">
          <div className="descubrir-brujula">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>
          <div className="descubrir-texto">
            <span className="eyebrow">¿NO SABES QU&Eacute; EXPERIENCIA ELEGIR?</span>
            <h2>Encuentra tu experiencia</h2>
            <p>Mira los paquetes y descubre el plan que mejor se adapta a lo que buscas.</p>
          </div>
        </div>
        <a className="descubrir-btn" href="#descubre">
          COMENZAR AHORA <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </section>
  );
}

export default Discover;
