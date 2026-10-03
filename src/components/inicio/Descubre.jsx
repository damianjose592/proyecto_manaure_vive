import { useEffect, useState } from 'react';
import '../../styles/inicio/Descubre.css';

const INTERESES = [
  { id: 'naturaleza', etiqueta: 'Naturaleza', icon: (<svg viewBox="0 0 24 24"><path d="M4 20c9-1 15-7 16-16-9 1-15 7-16 16z" /><path d="M4 20c3-7 8-11 13-14" /></svg>) },
  { id: 'aventura', etiqueta: 'Aventura', icon: (<svg viewBox="0 0 24 24"><path d="M2 19l6.5-11L13 15l2.5-4L22 19z" /><circle cx="9" cy="5" r="1.4" fill="currentColor" stroke="none" /></svg>) },
  { id: 'fotografia', etiqueta: 'Fotograf\u00eda', icon: (<svg viewBox="0 0 24 24"><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" /><circle cx="12" cy="13.5" r="3.3" /></svg>) },
  { id: 'gastronomia', etiqueta: 'Gastronom\u00eda', icon: (<svg viewBox="0 0 24 24"><path d="M6 2v8M4 2v5a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V2M6 12v10" /><path d="M18 2c-1.5 0-3 1.8-3 5s1.5 5 3 5v9" /></svg>) },
  { id: 'cultura', etiqueta: 'Cultura', icon: (<svg viewBox="0 0 24 24"><path d="M3 21h18M4 21V10M20 21V10M2 10l10-6 10 6M7 10v7M11 10v7M13 10v7M17 10v7" /></svg>) },
  { id: 'romance', etiqueta: 'Romance', icon: (<svg viewBox="0 0 24 24"><path d="M12 20.5s-8-5-8-11.2A4.8 4.8 0 0 1 12 6.8a4.8 4.8 0 0 1 8 2.5c0 6.2-8 11.2-8 11.2z" /></svg>) },
  { id: 'deportes', etiqueta: 'Deportes', icon: (<svg viewBox="0 0 24 24"><circle cx="14.5" cy="4.5" r="1.6" fill="currentColor" stroke="none" /><path d="M6 21l3.5-5 2.5 2 3-6M9 16l-2.5-3.5L11 10l2 2.5 5-1.5" /></svg>) },
  { id: 'relajacion', etiqueta: 'Relajaci\u00f3n', icon: (<svg viewBox="0 0 24 24"><path d="M12 21c-4-1-7-4-7-8 3 0 5.5 1.5 7 4 1.5-2.5 4-4 7-4 0 4-3 7-7 8z" /><path d="M12 21c-2.5-2-3-4.5-3-7 2 0 3.2 1 3 3 -.2-2 1-3 3-3 0 2.5-.5 5-3 7z" /></svg>) },
];

const ICONO_RELOJ = (<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>);
const ICONO_GRUPO = (<svg viewBox="0 0 24 24"><circle cx="8.5" cy="8" r="2.6" /><circle cx="16" cy="8.5" r="2.2" /><path d="M3 20v-2.2a4.4 4.4 0 0 1 4.4-4.4h2.2a4.4 4.4 0 0 1 4.4 4.4V20" /><path d="M15 13.6a3.6 3.6 0 0 1 3.4-1 3.6 3.6 0 0 1 2.6 3.4V20" /></svg>);
const ICONO_PIN = (<svg viewBox="0 0 24 24"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.3" /></svg>);
const ICONO_ESTRELLA = (<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.7 1.5 6.8-6.1-3.5-6.1 3.5 1.5-6.8-5.2-4.7 6.9-.7z" /></svg>);

const SOCIO_LOGO = {
  'Manaure Aventura': 'manaure-aventura.webp',
  'Villa Adelaida': 'villa-adelaida.webp',
  'Cuatri Tours Manaure': 'cuatri-tours-manaure.webp',
  'PHOTours': 'photours.webp',
  'Mashiramo Glamping': 'mashiramo-glamping.webp',
  'Absolom Casita de la Mora': 'absolom-casita-de-la-mora.webp',
  'Coruscans': 'coruscans.webp',
  'La Casa de las Arepas': 'la-casa-de-las-arepas.webp',
  'Los Pinos Manaure': 'los-pinos-manaure.webp',
  'Metallura': 'metallura.webp',
};

const logoSocio = nombre => `${process.env.PUBLIC_URL}/assets/partners/${SOCIO_LOGO[nombre]}`;

export const PAQUETES_DEMO = [
  {
    titulo: 'Adrenalina Serrana',
    desc: 'Parapente + Cuatrimoto + R\u00edo',
    meta: ['D\u00eda completo', '2-10 personas', 'Manaure, Cesar'],
    socios: ['Manaure Aventura', 'Cuatri Tours Manaure'], precio: '$340.000', base: 'por persona',
    etiqueta: 'M\u00e1s popular', destacada: true,
    intereses: ['aventura', 'deportes'], duracionId: 'completo', paquete: 0,
    estilos: ['adrenalina', 'exploradora'], companias: ['amigos', 'familia'],
    imagen: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    avatar: `${process.env.PUBLIC_URL}/assets/partners/manaure-aventura.webp`,
  },
  {
    titulo: 'Cumbres de Niebla',
    desc: 'Domo + Jacuzzi + Vino de mora',
    meta: ['Fin de semana', '2 personas', 'Manaure, Cesar'],
    socios: ['Mashiramo Glamping', 'Absolom Casita de la Mora'], precio: '$790.000', base: 'por pareja',
    etiqueta: 'Rom\u00e1ntico', destacada: false,
    intereses: ['romance', 'relajacion'], duracionId: 'finde', paquete: 1,
    estilos: ['relajada'], companias: ['pareja'],
    imagen: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=85',
    avatar: `${process.env.PUBLIC_URL}/assets/partners/mashiramo-glamping.webp`,
  },
  {
    titulo: 'Expedici\u00f3n Metallura',
    desc: 'Aves + P\u00e1ramo + Reserva ProAves',
    meta: ['2 d\u00edas y 1 noche', '2-8 personas', 'Manaure, Cesar'],
    socios: ['Metallura', 'Coruscans'], precio: '$520.000', base: 'por persona',
    etiqueta: 'Naturaleza', destacada: false,
    intereses: ['naturaleza', 'deportes'], duracionId: 'finde', paquete: 3,
    estilos: ['exploradora'], companias: ['solo', 'amigos'],
    imagen: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85',
    avatar: `${process.env.PUBLIC_URL}/assets/partners/metallura.webp`,
  },
  {
    titulo: 'Sabores del Perij\u00e1',
    desc: '4 estaciones + Cata de caf\u00e9 + Mora',
    meta: ['D\u00eda completo', '2-8 personas', 'Manaure, Cesar'],
    socios: ['Villa Adelaida', 'La Casa de las Arepas'], precio: '$175.000', base: 'por persona',
    etiqueta: 'Gastron\u00f3mico', destacada: true,
    intereses: ['gastronomia'], duracionId: 'completo', paquete: 6,
    estilos: ['relajada'], companias: ['familia', 'amigos'],
    imagen: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1000&q=85',
    avatar: `${process.env.PUBLIC_URL}/assets/partners/villa-adelaida.webp`,
  },
  {
    titulo: 'Safari Fotogr\u00e1fico',
    desc: 'Cascadas + Vestido flotante + 15 fotos',
    meta: ['D\u00eda completo', '2-6 personas', 'Manaure, Cesar'],
    socios: ['PHOTours', 'Los Pinos Manaure'], precio: '$290.000', base: 'por persona',
    etiqueta: 'Fotograf\u00eda', destacada: false,
    intereses: ['fotografia'], duracionId: 'completo', paquete: 5,
    estilos: ['exploradora'], companias: ['solo', 'pareja'],
    imagen: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=85',
    avatar: `${process.env.PUBLIC_URL}/assets/partners/photours.webp`,
  },
  {
    titulo: 'Ruta del Grano a la Fruta',
    desc: 'Caf\u00e9 + Moras + Topiarios',
    meta: ['D\u00eda completo', '2-10 personas', 'Manaure, Cesar'],
    socios: ['Coruscans', 'Absolom Casita de la Mora'], precio: '$145.000', base: 'por persona',
    etiqueta: 'Cultura', destacada: false,
    intereses: ['cultura'], duracionId: 'completo', paquete: 2,
    estilos: ['relajada', 'exploradora'], companias: ['familia', 'amigos'],
    imagen: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=85',
    avatar: `${process.env.PUBLIC_URL}/assets/partners/coruscans.webp`,
  },
];

const DESTACADOS_DEMO = [
  { etiqueta: 'Romance', titulo: 'Cumbres de Niebla', precio: 'Desde $790.000', imagen: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85' },
  { etiqueta: 'Aventura', titulo: 'Adrenalina Serrana', precio: 'Desde $340.000', imagen: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=85' },
  { etiqueta: 'Gastronom\u00eda', titulo: 'Sabores del Perij\u00e1', precio: 'Desde $175.000', imagen: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=85' },
];

function useEsMovil() {
  const [esMovil, setEsMovil] = useState(() => typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(max-width: 620px)').matches);
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return undefined;
    const consulta = window.matchMedia('(max-width: 620px)');
    const actualizar = e => setEsMovil(e.matches);
    if (consulta.addEventListener) consulta.addEventListener('change', actualizar);
    else if (consulta.addListener) consulta.addListener(actualizar);
    return () => {
      if (consulta.removeEventListener) consulta.removeEventListener('change', actualizar);
      else if (consulta.removeListener) consulta.removeListener(actualizar);
    };
  }, []);
  return esMovil;
}

function GrupoColapsable({ id, abierto, onCambiar, titulo, subtitulo, children, plegable }) {
  if (!plegable) {
    return (
      <div className="db-filter-group">
        <h3>{titulo}</h3>
        <p>{subtitulo}</p>
        {children}
      </div>
    );
  }
  return (
    <details className="db-filter-group" open={abierto} onToggle={e => onCambiar(id, e.target.open)}>
      <summary className="db-filter-sum">
        <span className="db-filter-sum-text">
          <h3>{titulo}</h3>
          <p>{subtitulo}</p>
        </span>
      </summary>
      {children}
    </details>
  );
}

function Descubre() {
  const [intereses, setIntereses] = useState(() => new Set());
  const [orden, setOrden] = useState('relevancia');

  useEffect(() => {
    const elementos = Array.from(document.querySelectorAll('.db-page [data-reveal]:not(.is-visible)'));
    if (elementos.length === 0) return undefined;
    if (!('IntersectionObserver' in window)) {
      elementos.forEach(elemento => elemento.classList.add('is-visible'));
      return undefined;
    }
    const observador = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observador.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    elementos.forEach(elemento => observador.observe(elemento));
    return () => observador.disconnect();
  }, []);

  const alternarInteres = id => {
    setIntereses(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const coincide = (p, ints) => ints.size === 0 || p.intereses.some(id => ints.has(id));

  const limpiar = () => {
    setIntereses(new Set());
    setOrden('relevancia');
  };

  const esMovil = useEsMovil();
  const [grupos, setGrupos] = useState(null);
  const grupoAbierto = id => (grupos ? grupos.has(id) : !esMovil);
  const alternarGrupo = (id, abierto) => {
    setGrupos(prev => {
      const base = prev ? new Set(prev) : new Set(!esMovil ? ['intereses'] : []);
      if (abierto) base.add(id);
      else base.delete(id);
      return base;
    });
  };

  const precioNumero = texto => Number(String(texto).replace(/[^0-9]/g, '')) || 0;

  // Resultados en vivo: a medida que se selecciona un filtro
  // aparecen las similitudes de paquetes.
  const base = PAQUETES_DEMO.filter(p => coincide(p, intereses));

  // Huella de la selección: remonta las tarjetas para re-animarlas al filtrar.
  const huellaSeleccion = [...intereses].sort().join('|');

  const paquetesOrdenados = [...base].sort((a, b) => {
    if (orden === 'precio-asc') return precioNumero(a.precio) - precioNumero(b.precio);
    if (orden === 'precio-desc') return precioNumero(b.precio) - precioNumero(a.precio);
    if (orden === 'nombre') return a.titulo.localeCompare(b.titulo, 'es');
    return 0;
  });

  return (
    <section className="db-page" id="descubre" data-reveal="section">
      <section className="db-filter-wrap" data-reveal="section">
        <div className="db-filter" data-reveal="content">
          <div className="db-filter-head">
            {!esMovil && <h2 className="db-filter-title">1. &iquest;Qu&eacute; te gustar&iacute;a experimentar?</h2>}
            <button type="button" className="db-limpiar-link" onClick={limpiar}>Limpiar filtros</button>
          </div>
          {!esMovil && <p className="db-filter-sub">Selecciona uno o varios intereses</p>}

          {esMovil ? (
            <GrupoColapsable
              id="intereses"
              plegable
              abierto={grupoAbierto('intereses')}
              onCambiar={alternarGrupo}
              titulo={<>1. &iquest;Qu&eacute; te gustar&iacute;a experimentar?</>}
              subtitulo="Selecciona uno o varios intereses"
            >
              <div className="db-interests">
                {INTERESES.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={`db-choice${intereses.has(item.id) ? ' active' : ''}`}
                    onClick={() => alternarInteres(item.id)}
                    aria-pressed={intereses.has(item.id)}
                  >
                    <span className="db-icon">{item.icon}</span>
                    <span>{item.etiqueta}</span>
                  </button>
                ))}
              </div>
            </GrupoColapsable>
          ) : (
            <div className="db-interests">
              {INTERESES.map(item => (
                <button
                  key={item.id}
                  type="button"
                  className={`db-choice${intereses.has(item.id) ? ' active' : ''}`}
                  onClick={() => alternarInteres(item.id)}
                  aria-pressed={intereses.has(item.id)}
                >
                  <span className="db-icon">{item.icon}</span>
                  <span>{item.etiqueta}</span>
                </button>
              ))}
            </div>
          )}

        </div>
      </section>

      <section className="db-content" data-reveal="section">
        <div className="db-section-head" data-reveal="heading">
          <div>
            <div className="db-kicker">Resultados personalizados</div>
            <h2>Paquetes recomendados para ti</h2>
          </div>
          <div className="db-results-note">
            <span>Se encontraron {base.length} paquete{base.length === 1 ? '' : 's'} que coinciden con tus preferencias</span>
            <select className="db-sort" value={orden} onChange={e => setOrden(e.target.value)} aria-label="Ordenar paquetes">
              <option value="relevancia">Ordenar por: M&aacute;s relevantes</option>
              <option value="precio-asc">Precio: menor a mayor</option>
              <option value="precio-desc">Precio: mayor a menor</option>
              <option value="nombre">Nombre A-Z</option>
            </select>
          </div>
        </div>

        <div className="db-cards" key={huellaSeleccion}>
          {base.length === 0 && (
            <div className="db-vacio">
              <p>No hay paquetes para esa combinaci&oacute;n. Prueba con otros intereses.</p>
              <button type="button" className="db-limpiar-link" onClick={limpiar}>Limpiar filtros</button>
            </div>
          )}
          {paquetesOrdenados.map(p => (
            <article className="db-card" key={p.titulo}>
              <div className="db-card-img" style={{ backgroundImage: `url("${p.imagen}")` }}>
                <span className={`db-badge${p.destacada ? ' orange' : ''}`}>{p.etiqueta}</span>
              </div>
              <div className="db-card-body">
                <h3>{p.titulo}</h3>
                <p className="db-card-desc">{p.desc}</p>
                <div className="db-meta">
                  <span>{ICONO_RELOJ}{p.meta[0]}</span>
                  <span>{ICONO_GRUPO}{p.meta[1]}</span>
                  <span>{ICONO_PIN}{p.meta[2]}</span>
                </div>
                  <div className="db-partner">
                    <div className="db-avatares">
                    {p.socios.map(nombre => (
                      <div key={nombre} className="db-avatar" title={nombre} style={{ backgroundImage: `url("${logoSocio(nombre)}")` }} />
                    ))}
                  </div>
                  <div><strong>{p.socios.join(' + ')}</strong><small>Convenios</small></div>
                  <div className="db-price"><small>Desde</small><strong>{p.precio}</strong><em>{p.base}</em></div>
                </div>
                <a className="db-detail" href={`#paquete/${p.paquete}`}>Ver detalle &rarr;</a>
              </div>
            </article>
          ))}
        </div>

        <section className="db-featured" data-reveal="content">
          <div className="db-featured-head">
            <div className="db-featured-title">
              <span className="db-crown">{ICONO_ESTRELLA}</span>
              <div><h2>Paquetes destacados</h2><p>Experiencias que est&aacute;n llamando la atenci&oacute;n</p></div>
            </div>
            <a className="db-featured-link" href="#paquetes-todos">Ver todos los paquetes &rarr;</a>
          </div>
          <div className="db-featured-grid">
            {DESTACADOS_DEMO.map(d => (
              <article className="db-featured-card" key={d.titulo} style={{ backgroundImage: `url("${d.imagen}")` }}>
                <div className="db-featured-info">
                  <span className="db-featured-tag">{d.etiqueta}</span>
                  <h3>{d.titulo}</h3>
                  <p>{d.precio}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </section>
  );
}

export default Descubre;
