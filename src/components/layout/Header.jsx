import '../../styles/layout/Header.css';

function Header({ menuOpen, onMenuToggle, galeriaActiva, seccionActiva = 'inicio' }) {
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
        <a className={isSectionActive('experiencias') ? 'active' : ''} href="#experiencias" onClick={closeAll}>Experiencias</a>
        <a className={isSectionActive('paquetes') ? 'active' : ''} href="#paquetes-todos" onClick={closeAll}>Paquetes</a>
        <a className={galeriaActiva || isSectionActive('galeria') ? 'active' : ''} href="#galeria" onClick={closeAll}>Galería</a>
        <a className={isSectionActive('contacto') ? 'active' : ''} href="#contacto" onClick={closeAll}>Contacto</a>
        <a className={isSectionActive('convenios') ? 'active' : ''} href="#convenios" onClick={closeAll}>Convenios</a>
        <a className="reserve-menu" href="#paquetes-todos" onClick={closeAll}>Reservar</a>
      </nav>

      <div className="header-actions">
        <a className="reserve-top" href="#paquetes-todos" onClick={closeAll}>Reservar</a>
      </div>

    </header>
  );
}

export default Header;