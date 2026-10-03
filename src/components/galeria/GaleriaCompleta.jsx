import { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/galeria/GaleriaCompleta.css';
import { FILTROS_GALERIA, COLORES_CATEGORIA, useGaleria } from '../../utils/inicio/Galeria.utils';

function IconoFiltro({ icono }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {(icono.rects || []).map((rect, i) => <rect key={`r${i}`} {...rect} />)}
      {(icono.circles || []).map((circle, i) => <circle key={`c${i}`} {...circle} />)}
      {(icono.paths || []).map((d, i) => <path key={`p${i}`} d={d} />)}
    </svg>
  );
}

function GaleriaCompleta({ indiceInicial = null }) {
  const { filtroActivo, setFiltroActivo, fotosFiltradas } = useGaleria();
  const [seleccionada, setSeleccionada] = useState(indiceInicial);
  const [filtroAbierto, setFiltroAbierto] = useState(false);
  const filtroRef = useRef(null);

  const cambiarFiltro = filtro => {
    setSeleccionada(null);
    setFiltroActivo(filtro);
  };

  const elegirFiltro = filtro => {
    cambiarFiltro(filtro);
    setFiltroAbierto(false);
  };

  // Al entrar a la galería: siempre arranca en "Todas" y sin foto abierta,
  // salvo que se venga del preview (indiceInicial).
  useEffect(() => {
    setFiltroActivo('Todas');
    setSeleccionada(indiceInicial ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSeleccionada(indiceInicial ?? null);
  }, [indiceInicial]);

  useEffect(() => {
    if (!filtroAbierto) return undefined;
    const alClickFuera = evento => {
      if (filtroRef.current && !filtroRef.current.contains(evento.target)) setFiltroAbierto(false);
    };
    const alTecla = evento => {
      if (evento.key === 'Escape') setFiltroAbierto(false);
    };
    document.addEventListener('mousedown', alClickFuera);
    document.addEventListener('keydown', alTecla);
    return () => {
      document.removeEventListener('mousedown', alClickFuera);
      document.removeEventListener('keydown', alTecla);
    };
  }, [filtroAbierto]);

  const cerrar = useCallback(() => setSeleccionada(null), []);
  const avanzar = useCallback(
    direccion => {
      setSeleccionada(actual => {
        if (actual === null) return actual;
        const total = fotosFiltradas.length;
        return (actual + direccion + total) % total;
      });
    },
    [fotosFiltradas.length]
  );

  useEffect(() => {
    if (seleccionada === null) return undefined;
    const alTeclado = evento => {
      if (evento.key === 'Escape') cerrar();
      if (evento.key === 'ArrowRight') avanzar(1);
      if (evento.key === 'ArrowLeft') avanzar(-1);
    };
    window.addEventListener('keydown', alTeclado);
    const y = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${y}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', alTeclado);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, y);
    };
  }, [seleccionada, cerrar, avanzar]);

  const fotoActiva = seleccionada !== null ? fotosFiltradas[seleccionada] : null;
  const totalFotos = fotosFiltradas.length;

  const renderMedia = (foto, isLightbox = false) => {
    if (foto.tipo === 'video') {
      return (
        <>
          <video
            src={foto.imagen}
            controls={isLightbox}
            autoPlay={isLightbox}
            muted={!isLightbox}
            playsInline
            loop={isLightbox}
            preload="metadata"
            className="galeria-media galeria-media-video"
          />
          <span className="galeria-video-badge" aria-hidden="true">▶</span>
        </>
      );
    }

    return <img src={foto.imagen} alt={foto.alt} className="galeria-media" loading="lazy" />;
  };

  return (
    <section className="galeria section-ecoturismo" id="galeria" data-reveal="section">
      <div className="galeria-head" data-reveal="heading">
        <div className="galeria-intro">
          <span className="eyebrow">GALERÍA</span>
          <h2>Momentos que inspiran</h2>
          <p>Descubre Manaure a través de sus paisajes, su gente, sus sabores y todas las experiencias que lo hacen único.</p>
        </div>

        <div className="galeria-head-actions">
          <span className="galeria-meta">COLOMBIA • {totalFotos} FOTOS</span>
          <p className="galeria-note">
            Naturaleza, cultura, gastronomía y experiencias{' '}
            <span className="galeria-note-highlight">en un solo lugar</span>
          </p>
        </div>
      </div>

      <div className="galeria-filters" role="tablist" aria-label="Filtrar galería por categoría" data-reveal="content">
        {FILTROS_GALERIA.map(filtro => (
          <button
            key={filtro.nombre}
            className={`galeria-filter${filtroActivo === filtro.nombre ? ' active' : ''}`}
            onClick={() => cambiarFiltro(filtro.nombre)}
            role="tab"
            aria-selected={filtroActivo === filtro.nombre}
            type="button"
          >
            <IconoFiltro icono={filtro.icono} />
            {filtro.nombre}
          </button>
        ))}
      </div>

      <div className="galeria-filter-single" data-reveal="content" ref={filtroRef}>
        <span className="galeria-filter-label" id="filtro-galeria-label">
          Filtrar por
        </span>
        <button
          type="button"
          id="filtro-galeria-btn"
          className="galeria-select"
          aria-haspopup="listbox"
          aria-expanded={filtroAbierto}
          aria-labelledby="filtro-galeria-label filtro-galeria-btn"
          onClick={() => setFiltroAbierto(abierto => !abierto)}
        >
          <span>{filtroActivo}</span>
          <span aria-hidden="true" className="galeria-select-arrow">▾</span>
        </button>
        {filtroAbierto && (
          <ul className="galeria-options" role="listbox" aria-labelledby="filtro-galeria-label">
            {FILTROS_GALERIA.map(filtro => (
              <li
                key={filtro.nombre}
                role="option"
                aria-selected={filtroActivo === filtro.nombre}
                tabIndex={0}
                className={`galeria-option${filtroActivo === filtro.nombre ? ' selected' : ''}`}
                onClick={() => elegirFiltro(filtro.nombre)}
                onKeyDown={evento => {
                  if (evento.key === 'Enter' || evento.key === ' ') {
                    evento.preventDefault();
                    elegirFiltro(filtro.nombre);
                  }
                }}
              >
                {filtro.nombre}
                {filtroActivo === filtro.nombre && <span aria-hidden="true"> ✓</span>}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="galeria-grid" data-reveal="content">
        {fotosFiltradas.map((foto, indice) => (
          <button
            key={foto.imagen}
            className={`galeria-item galeria-shape-${indice % 6}${foto.destacada && filtroActivo === 'Todas' ? ' featured' : ''}`}
            onClick={() => setSeleccionada(indice)}
            type="button"
            aria-label={`Ampliar foto: ${foto.titulo}`}
          >
            {renderMedia(foto, false)}
            <span className="galeria-tag" style={{ background: COLORES_CATEGORIA[foto.categoria] }}>
              {foto.categoria}
            </span>
            <span className="galeria-caption">
              <strong>{foto.titulo}</strong>
              <small>⌖ {foto.ubicacion}</small>
            </span>
          </button>
        ))}
      </div>

      <div className="galeria-more" data-reveal="content">
        <button className="galeria-all" onClick={() => cambiarFiltro('Todas')} type="button">
          <span aria-hidden="true">▣</span> VER TODA LA GALERÍA <span aria-hidden="true">→</span>
        </button>
      </div>

      {fotoActiva && createPortal(
        <div className="galeria-lightbox" role="dialog" aria-modal="true" aria-label={fotoActiva.titulo} onClick={cerrar}>
          <button className="galeria-close" onClick={cerrar} type="button" aria-label="Cerrar vista">
            ✕
          </button>
          <div className="galeria-box" onClick={evento => evento.stopPropagation()}>
            <div className="galeria-photo">
              {renderMedia(fotoActiva, true)}
              <button className="galeria-nav prev" onClick={() => avanzar(-1)} type="button" aria-label="Foto anterior">
                ‹
              </button>
              <button className="galeria-nav next" onClick={() => avanzar(1)} type="button" aria-label="Foto siguiente">
                ›
              </button>
              <div className="galeria-count">
                <strong>{seleccionada + 1} / {fotosFiltradas.length}</strong>
                <div className="galeria-dots" aria-hidden="true">
                  {fotosFiltradas.map((foto, indice) => (
                    <span key={foto.imagen} className={indice === seleccionada ? 'active' : ''} />
                  ))}
                </div>
              </div>
            </div>
            <div className="galeria-info">
              <span className="galeria-tag" style={{ background: COLORES_CATEGORIA[fotoActiva.categoria] }}>
                {fotoActiva.categoria}
              </span>
              <h3>{fotoActiva.titulo}</h3>
              <p className="galeria-location">⌖ {fotoActiva.ubicacion}</p>
              <p className="galeria-description">{fotoActiva.descripcion}</p>
              <div className="galeria-host">
                {fotoActiva.socioLogo ? (
                  <img className="galeria-avatar" src={fotoActiva.socioLogo} alt={`Logo de ${fotoActiva.socio}`} />
                ) : (
                  <span className="galeria-avatar" aria-hidden="true">⌁</span>
                )}
                <div>
                  <small>Ofrecido por</small>
                  <strong>{fotoActiva.socio}</strong>
                </div>
              </div>
              <a className="btn btn-primary" href="#paquetes">
                Ver experiencia <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>, document.body)}
    </section>
  );
}

export default GaleriaCompleta;
