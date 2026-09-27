import { useState, useEffect, useRef } from 'react';
import './styles/global/App.css';
import useScrollReveal from './utils/useScrollReveal';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/inicio/Hero';
import Discover from './components/inicio/Discover';
import Featured from './components/inicio/Featured';
import Partners from './components/inicio/Partners';
import Gallery from './components/inicio/Gallery';
import CTA from './components/inicio/CTA';
import Contacto from './components/inicio/Contacto';
import PaquetesCompleta from './components/inicio/PaquetesCompleta';
import Descubre from './components/inicio/Descubre';
import DetallePaquete from './components/inicio/DetallePaquete';
import ReservarExperiencia from './components/inicio/ReservarExperiencia';
import WhatsAppButton from './components/layout/WhatsAppButton';
import GaleriaCompleta from './components/galeria/GaleriaCompleta';
import { paquetesEcoturismo } from './utils/inicio/Ecoturismo.utils';

const obtenerIndicePaquete = () => {
  const coincidencia =
    window.location.hash.match(/^#paquete\/(\d+)$/) ||
    window.location.hash.match(/^#reserva\/(\d+)$/);
  return coincidencia ? Number(coincidencia[1]) : null;
};

const INTERESES_DESCUBRE = ['naturaleza', 'aventura', 'fotografia', 'gastronomia', 'cultura', 'romance', 'deportes', 'relajacion'];

const obtenerInteresDescubre = () => {
  const coincidencia = window.location.hash.match(/^#descubre\/([a-z]+)$/);
  const id = coincidencia ? coincidencia[1] : null;
  return INTERESES_DESCUBRE.includes(id) ? id : null;
};

function App() {
  const [cargando, setCargando] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [vistaGaleria, setVistaGaleria] = useState(() => window.location.hash === '#galeria');
  const [vistaPaquetes, setVistaPaquetes] = useState(() => window.location.hash === '#paquetes-todos');
  const [vistaDescubre, setVistaDescubre] = useState(() => window.location.hash === '#descubre' || obtenerInteresDescubre() !== null);
  const [interesDescubre, setInteresDescubre] = useState(obtenerInteresDescubre);
  const [indicePaquete, setIndicePaquete] = useState(obtenerIndicePaquete);
  const [reservaActiva, setReservaActiva] = useState(() =>
    /^#reserva\//.test(window.location.hash)
  );
  const [reservaModal, setReservaModal] = useState(false);
  const [favReserva, setFavReserva] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState(() => {
    const hash = window.location.hash.replace('#', '').trim();
    if (!hash || hash === 'inicio') return 'inicio';
    if (hash === 'galeria') return 'galeria';
    if (hash === 'descubre' || hash.startsWith('descubre/')) return 'experiencias';
    if (hash === 'paquetes-todos') return 'paquetes';
    return ['experiencias', 'paquetes', 'destinos', 'convenios', 'nosotros', 'reserva', 'contacto'].includes(hash)
      ? hash
      : 'inicio';
  });
  const [indiceGaleriaSeleccionada, setIndiceGaleriaSeleccionada] = useState(null);
  const scrollRevealRef = useScrollReveal([vistaGaleria, vistaPaquetes, vistaDescubre, indicePaquete]);
  const paqueteSeleccionado = Number.isInteger(indicePaquete) ? paquetesEcoturismo[indicePaquete] : null;
  const enReserva = reservaActiva && paqueteSeleccionado;
  const cerrarReserva = () => {
    setReservaActiva(false);
    setIndicePaquete(null);
    window.location.hash = '#paquetes';
  };
  const desplazarSegunHash = () => {
    const h = window.location.hash.replace('#', '').trim();
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        if (!h || h === 'inicio') {
          window.scrollTo(0, 0);
          return;
        }
        if (
          h === 'galeria' ||
          h === 'paquetes-todos' ||
          h === 'descubre' ||
          h.startsWith('descubre/')
        ) {
          window.scrollTo(0, 0);
          return;
        }
        if (
          h.startsWith('paquete/') ||
          h.startsWith('reserva/')
        ) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        const destino = document.getElementById(h);
        if (destino) destino.scrollIntoView({ block: 'start' });
      });
    });
  };

  const enGaleriaRef = useRef(vistaGaleria);
  const posInicioGaleria = useRef(0);
  const anclaPendiente = useRef(null);
  enGaleriaRef.current = vistaGaleria;

  useEffect(() => {
    const alCambiarHash = () => {
      const esGaleria = window.location.hash === '#galeria';
      const esPaquetesTodos = window.location.hash === '#paquetes-todos';
      const esDescubre = window.location.hash === '#descubre' || obtenerInteresDescubre() !== null;
      const indice = obtenerIndicePaquete();
      const esPaquete = Number.isInteger(indice) && Boolean(paquetesEcoturismo[indice]);
      const esReserva = /^#reserva\//.test(window.location.hash);
      const hash = window.location.hash.replace('#', '').trim();
      const nuevaSeccion = !hash || hash === 'inicio'
        ? 'inicio'
        : hash === 'galeria'
          ? 'galeria'
          : ['experiencias', 'paquetes', 'destinos', 'convenios', 'nosotros', 'reserva', 'contacto'].includes(hash)
            ? hash
            : 'inicio';

      setSeccionActiva(esDescubre ? 'experiencias' : (esPaquetesTodos || esPaquete ? 'paquetes' : nuevaSeccion));
      setIndicePaquete(esPaquete ? indice : null);
      setReservaActiva(esReserva && esPaquete);

      if (esGaleria || esPaquetesTodos || esDescubre || esPaquete) {
        if (!enGaleriaRef.current) posInicioGaleria.current = window.scrollY;
        anclaPendiente.current = null;
      } else {
        anclaPendiente.current = window.location.hash.replace('#', '') || null;
      }
      setVistaGaleria(esGaleria);
      setVistaPaquetes(esPaquetesTodos);
      setVistaDescubre(esDescubre);
      setInteresDescubre(obtenerInteresDescubre());
      desplazarSegunHash();
    };
    window.addEventListener('hashchange', alCambiarHash);
    return () => window.removeEventListener('hashchange', alCambiarHash);
  }, []);

  useEffect(() => {
    const secciones = [
      ['inicio', 'inicio'],
      ['experiencias', 'experiencias'],
      ['paquetes', 'paquetes'],
      ['destinos', 'galeria'],
      ['contacto', 'contacto'],
      ['convenios', 'convenios'],
      ['reserva', 'reserva'],
    ];
    let ticking = false;
    const actualizarPorScroll = () => {
      ticking = false;
      if (vistaGaleria || vistaPaquetes || vistaDescubre || paqueteSeleccionado || reservaActiva) return;
      const linea = window.innerHeight * 0.4;
      let actual = 'inicio';
      secciones.forEach(([domId, seccion]) => {
        const el = document.getElementById(domId);
        if (el && el.getBoundingClientRect().top <= linea) actual = seccion;
      });
      setSeccionActiva(prev => (prev === actual ? prev : actual));
    };
    const alHacerScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(actualizarPorScroll);
      }
    };
    actualizarPorScroll();
    window.addEventListener('scroll', alHacerScroll, { passive: true });
    return () => window.removeEventListener('scroll', alHacerScroll);
  }, [vistaGaleria, vistaPaquetes, vistaDescubre, paqueteSeleccionado, reservaActiva]);

  useEffect(() => {
    if (!reservaModal) return;
    document.body.style.overflow = 'hidden';
    const alTeclar = e => {
      if (e.key === 'Escape') setReservaModal(false);
    };
    window.addEventListener('keydown', alTeclar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', alTeclar);
    };
  }, [reservaModal]);

  useEffect(() => {
    try {
      window.history.scrollRestoration = 'manual';
    } catch (e) {
      /* navegadores sin soporte: se ignora */
    }
    desplazarSegunHash();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!paqueteSeleccionado && (
        <Header
          menuOpen={menuOpen}
          onMenuToggle={() => setMenuOpen(o => !o)}
          galeriaActiva={vistaGaleria}
          seccionActiva={seccionActiva}
          onReservar={() => setReservaModal(true)}
        />
      )}
      {enReserva ? (
        <>
          <div className="dt-topnav">
            <div className="dt-topnav-inner">
              <button type="button" className="dt-icon-btn" onClick={cerrarReserva} aria-label="Volver">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="dt-topnav-titles">
                <span>Experiencia Manaure</span>
                <strong>Tours & Experiencias</strong>
              </div>
              <button
                type="button"
                className={`dt-icon-btn${favReserva ? ' dt-fav-activo' : ''}`}
                onClick={() => setFavReserva(v => !v)}
                aria-label="Guardar en favoritos"
                aria-pressed={favReserva}
              >
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
              </button>
            </div>
          </div>
          <ReservarExperiencia
            key={indicePaquete}
            paqueteInicial={paqueteSeleccionado}
            onCerrar={cerrarReserva}
            mostrarVolver={false}
          />
        </>
      ) : paqueteSeleccionado ? (
        <DetallePaquete
          key={indicePaquete}
          paquete={paqueteSeleccionado}
          onReservar={() => {
            setReservaActiva(true);
            window.location.hash = `#reserva/${indicePaquete}`;
          }}
        />
      ) : vistaGaleria ? (
        <main key="galeria" ref={scrollRevealRef}>
          <GaleriaCompleta indiceInicial={indiceGaleriaSeleccionada} />
          <CTA />
        </main>
      ) : vistaPaquetes ? (
        <main key="paquetes-todos" ref={scrollRevealRef}>
          <PaquetesCompleta onVerDetalle={indice => {
            setIndicePaquete(indice);
            window.location.hash = `#paquete/${indice}`;
          }} />
        </main>
      ) : vistaDescubre ? (
        <main key="descubre" ref={scrollRevealRef}>
          <Descubre key={interesDescubre || 'todos'} interesInicial={interesDescubre} />
        </main>
      ) : (
        <main key="inicio" ref={scrollRevealRef}>
          <Hero />
          <Discover />
          <Featured
            onVerDetalle={indice => {
              setIndicePaquete(indice);
              setSeccionActiva('paquetes');
              window.location.hash = `#paquete/${indice}`;
            }}
          />
          <Gallery onAbrirFoto={indice => {
            setIndiceGaleriaSeleccionada(indice);
            window.location.hash = '#galeria';
          }} />
          <Contacto />
          <Partners />
          <CTA />
        </main>
      )}
      <Footer />
      <WhatsAppButton />
      {reservaModal && (
        <div className="reserva-modal-backdrop" onClick={() => setReservaModal(false)}>
          <div
            className="reserva-modal"
            onClick={e => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Reservar experiencia"
          >
            <ReservarExperiencia paqueteInicial={null} onCerrar={() => setReservaModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
