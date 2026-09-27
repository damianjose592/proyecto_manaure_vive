import '../../styles/layout/Header.css';

function Header({ menuOpen, onMenuToggle, galeriaActiva, seccionActiva = 'inicio', onReservar }) {
  const closeAll = () => {
    if (menuOpen) onMenuToggle();
  };

  const isSectionActive = seccion => seccion === seccionActiva;

  return (
    <header className="site-header" id="top">

      {/* LOGO */}
      <a className="brand" href="#inicio" onClick={closeAll}>
        <div className="brand-logo-wrap">
          <img
            src={`${process.env.PUBLIC_URL}/assets/brand/logo-principal.png`}
            alt="Manaure Vive - Ecoturismo"
            className="brand-logo-img"
          />
        </div>
      </a>

      {/* HAMBURGUESA */}
      <button
        className="menu-toggle"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={onMenuToggle}
      >
        <span aria-hidden="true">&#9776;</span>
      </button>

      {/* NAV CENTRAL */}
      <nav id="site-navigation" className={`nav${menuOpen ? ' open' : ''}`}>
        <a className={galeriaActiva ? '' : isSectionActive('inicio') ? 'active' : ''} href="#inicio" onClick={closeAll}>Inicio</a>
        <a className={isSectionActive('experiencias') ? 'active' : ''} href="#descubre" onClick={closeAll}>Experiencias</a>
        <a className={isSectionActive('paquetes') ? 'active' : ''} href="#paquetes-todos" onClick={closeAll}>Paquetes</a>
        <a className={galeriaActiva || isSectionActive('galeria') ? 'active' : ''} href="#galeria" onClick={closeAll}>Galería</a>
        <a className={isSectionActive('contacto') ? 'active' : ''} href="#contacto" onClick={closeAll}>Contacto</a>
        <a className={isSectionActive('convenios') ? 'active' : ''} href="#convenios" onClick={closeAll}>Convenios</a>
        <button type="button" className="reserve-menu" onClick={() => { closeAll(); if (onReservar) onReservar(); }}>Reservar</button>
      </nav>

      <div className="header-actions">
        <button type="button" className="reserve-top" onClick={() => { closeAll(); if (onReservar) onReservar(); }}>Reservar</button>
      </div>

    </header>
  );
}

export default Header;