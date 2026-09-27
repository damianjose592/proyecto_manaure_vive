import { useEffect, useState } from 'react';
import '../../styles/inicio/DetallePaquete.css';
import '../../styles/inicio/Descubre.css';
import { conveniosEcoturismo, paquetesEcoturismo } from '../../utils/inicio/Ecoturismo.utils';

const RECOMENDACIONES = [
  'Calzado c\u00f3modo para caminar',
  'Protector solar y gorra',
  'Hidrataci\u00f3n y agua',
  'Documento de identidad',
];

const NO_INCLUYE_GENERICO = [
  'Gastos personales no especificados.',
  'Servicios no incluidos en el plan.',
  'Propinas voluntarias.',
];

const WHATSAPP_NUMERO = '573012706114';

function parsePrecio(precio) {
  if (!precio) return null;
  const numero = Number(String(precio).replace(/[^0-9]/g, ''));
  return Number.isFinite(numero) && numero > 0 ? numero : null;
}

function formatoCOP(valor) {
  return `$${valor.toLocaleString('es-CO')}`;
}

function hoyISO() {
  const hoy = new Date();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${hoy.getFullYear()}-${mes}-${dia}`;
}

function DetallePaquete({ paquete, onReservar }) {
  const precioAdulto = parsePrecio(paquete.precio);
  const precioNino = precioAdulto;
  const tienePrecio = precioAdulto !== null;
  const fotos = paquete.galeria && paquete.galeria.length > 0 ? paquete.galeria : [paquete.imagen];
  const listaSocios = paquete.socios && paquete.socios.length > 0 ? paquete.socios : [paquete.socio];

  const [fecha, setFecha] = useState(hoyISO());
  const [adultos, setAdultos] = useState(1);
  const [ninos, setNinos] = useState(0);
  const [bebes, setBebes] = useState(0);
  const [nombre, setNombre] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefono, setTelefono] = useState('');
  const [recogida, setRecogida] = useState('');
  const [modalAbierto, setModalAbierto] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);
  const [mostrarConvenios, setMostrarConvenios] = useState(false);
  const [visor, setVisor] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (visor === null) return;
    document.body.style.overflow = 'hidden';
    const alTeclar = e => {
      if (e.key === 'Escape') setVisor(null);
      if (e.key === 'ArrowRight') setVisor(v => (v + 1) % fotos.length);
      if (e.key === 'ArrowLeft') setVisor(v => (v - 1 + fotos.length) % fotos.length);
    };
    window.addEventListener('keydown', alTeclar);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', alTeclar);
    };
  });

  const cambiar = (tipo, delta) => {
    if (tipo === 'adultos') setAdultos(v => Math.max(1, v + delta));
    if (tipo === 'ninos') setNinos(v => Math.max(0, v + delta));
    if (tipo === 'bebes') setBebes(v => Math.max(0, v + delta));
  };

  const total = tienePrecio ? adultos * precioAdulto + ninos * precioNino : 0;

  const mensaje = [
    `Hola Manaure Vive, quiero reservar: ${paquete.titulo}.`,
    `Fecha: ${fecha}. Viajeros: ${adultos} adulto(s), ${ninos} ni\u00f1o(s), ${bebes} beb\u00e9(s).`,
    tienePrecio ? `Total estimado: ${formatoCOP(total)}.` : 'Quedo atento al precio y la disponibilidad.',
    nombre ? `Nombre: ${nombre}.` : '',
    documento ? `Doc: ${documento}.` : '',
    telefono ? `Tel: ${telefono}.` : '',
    recogida ? `Punto de encuentro: ${recogida}.` : '',
  ].filter(Boolean).join(' ');
  const reservaUrl = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

  const destacados = [
    `Experiencia de ${paquete.categoria.toLowerCase()} en Manaure con acompa\u00f1amiento local.`,
    `Operado por ${(paquete.socios || [paquete.socio]).join(', ')}, parte de nuestros convenios.`,
    'Tiempo para disfrutar y tomar fotograf\u00edas.',
    `Duraci\u00f3n estimada de ${paquete.duracion.toLowerCase()}.`,
  ];
  const preguntas = [
    ['\u00bfC\u00f3mo hago la reserva?', 'Elige la fecha y cu\u00e1ntos viajan, completa tus datos y confirma por WhatsApp. Te responderemos disponibilidad y los datos finales de la experiencia.'],
    ['\u00bfQu\u00e9 debo llevar?', 'Usa ropa c\u00f3moda seg\u00fan el clima, protector solar y agua. Al reservar te enviaremos las recomendaciones espec\u00edficas del plan.'],
    ['\u00bfEl precio puede cambiar?', 'El valor mostrado es una referencia por persona. Antes de reservar confirmaremos el precio, disponibilidad y cualquier condici\u00f3n del plan.'],
    ['\u00bfD\u00f3nde inicia la experiencia?', `El punto de encuentro se confirma al reservar con ${(paquete.socios || [paquete.socio]).join(', ')}. La experiencia se realiza en ${paquete.ubicacion}.`],
  ];

  const bloqueViajeros = (
    <>
      <div className="dt-contador">
        <div>
          <span className="dt-contador-nombre">Adultos (13+ a&ntilde;os)</span>
          <span className="dt-contador-precio">{tienePrecio ? `${formatoCOP(precioAdulto)} c/u` : 'Consultar'}</span>
        </div>
        <div className="dt-contador-btns">
          <button type="button" onClick={() => cambiar('adultos', -1)} aria-label="Quitar un adulto">-</button>
          <span>{adultos}</span>
          <button type="button" className="dt-mas" onClick={() => cambiar('adultos', 1)} aria-label="Agregar un adulto">+</button>
        </div>
      </div>
      <div className="dt-contador">
        <div>
          <span className="dt-contador-nombre">Ni&ntilde;os (3 a 12 a&ntilde;os)</span>
          <span className="dt-contador-precio">{tienePrecio ? `${formatoCOP(precioNino)} c/u` : 'Consultar'}</span>
        </div>
        <div className="dt-contador-btns">
          <button type="button" onClick={() => cambiar('ninos', -1)} aria-label="Quitar un ni\u00f1o">-</button>
          <span>{ninos}</span>
          <button type="button" className="dt-mas" onClick={() => cambiar('ninos', 1)} aria-label="Agregar un ni\u00f1o">+</button>
        </div>
      </div>
      <div className="dt-contador">
        <div>
          <span className="dt-contador-nombre">Beb&eacute;s (0 a 2 a&ntilde;os)</span>
          <span className="dt-contador-gratis">Gratis (en brazos)</span>
        </div>
        <div className="dt-contador-btns">
          <button type="button" onClick={() => cambiar('bebes', -1)} aria-label="Quitar un beb\u00e9">-</button>
          <span>{bebes}</span>
          <button type="button" className="dt-mas" onClick={() => cambiar('bebes', 1)} aria-label="Agregar un beb\u00e9">+</button>
        </div>
      </div>
    </>
  );

  const bloqueDatos = (
    <>
      <input
        type="text"
        placeholder="Nombre completo del titular"
        value={nombre}
        onChange={e => setNombre(e.target.value)}
        className="dt-input"
      />
      <div className="dt-datos-grid">
        <input
          type="text"
          placeholder="C\u00e9dula / Pasaporte"
          value={documento}
          onChange={e => setDocumento(e.target.value)}
          className="dt-input"
        />
        <input
          type="tel"
          placeholder="WhatsApp"
          value={telefono}
          onChange={e => setTelefono(e.target.value)}
          className="dt-input"
        />
      </div>
      <input
        type="text"
        placeholder="Punto de encuentro en Manaure"
        value={recogida}
        onChange={e => setRecogida(e.target.value)}
        className="dt-input"
      />
    </>
  );

  const bloqueTotal = tienePrecio ? (
    <div className="dt-total">
      <div className="dt-total-fila"><span>{adultos} Adulto(s):</span><span>{formatoCOP(adultos * precioAdulto)}</span></div>
      {ninos > 0 && (
        <div className="dt-total-fila"><span>{ninos} Ni&ntilde;o(s):</span><span>{formatoCOP(ninos * precioNino)}</span></div>
      )}
      <div className="dt-total-final"><span>Total estimado:</span><span>{formatoCOP(total)}</span></div>
    </div>
  ) : (
    <div className="dt-total"><p className="dt-total-consulta">Precio a consultar por WhatsApp seg&uacute;n fecha y grupo.</p></div>
  );

  const fotoVisor = visor !== null ? fotos[visor] : null;

  if (cargando) {
    return (
      <main className="detalle-paquete">
        <div className="dt-topnav">
          <div className="dt-topnav-inner">
            <a href="#paquetes" className="dt-icon-btn" aria-label="Volver a paquetes">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </a>
            <div className="dt-topnav-titles">
              <span>Experiencia Manaure</span>
              <strong>Tours & Experiencias</strong>
            </div>
            <span className="dt-icon-btn" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
            </span>
          </div>
        </div>
        <div className="db-cargando-full">
          <div>
            <div className="db-spinner" aria-hidden="true" />
            <p>Cargando tu experiencia...</p>
            <small>Preparando fotos, itinerario y convenios</small>
            <div className="db-carga-barra" aria-hidden="true"><span /></div>
          </div>
        </div>
        <div className="db-resultados">
          <div className="db-skeletons" aria-hidden="true">
            <div className="db-skel" />
            <div className="db-skel" />
            <div className="db-skel" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="detalle-paquete">
      <div className="dt-topnav">
        <div className="dt-topnav-inner">
          <a href="#paquetes" className="dt-icon-btn" aria-label="Volver a paquetes">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </a>
          <div className="dt-topnav-titles">
            <span>Experiencia Manaure</span>
            <strong>Tours & Experiencias</strong>
          </div>
          <button
            type="button"
            className={`dt-icon-btn${favorito ? ' dt-fav-activo' : ''}`}
            onClick={() => setFavorito(v => !v)}
            aria-label="Guardar en favoritos"
            aria-pressed={favorito}
          >
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>
          </button>
        </div>
      </div>
      <div className="detalle-contenedor">
        <a href="#paquetes" className="detalle-back">&larr; Volver a paquetes</a>
        <div className="dt-encabezado">
          <div className="detalle-badges">
            <span className="dt-badge-cat">{paquete.categoria}</span>
            <span className="dt-badge-convenio">{(paquete.socios || [paquete.socio]).join(', ')} &middot; {paquete.ubicacion}</span>
          </div>
          <h1 className="dt-titulo">{paquete.titulo}</h1>
        </div>

        <div className="dt-galeria">
          <figure className="dt-galeria-main dt-ampliar" onClick={() => setVisor(0)} title="Ampliar foto">
            <div className="dt-galeria-fondo" style={{ backgroundImage: `url(${fotos[0]})` }} aria-hidden="true" />
            <img src={fotos[0]} alt={paquete.titulo} />
            <span className="dt-galeria-chip">{paquete.categoria} en Manaure</span>
          </figure>
          <div className="dt-galeria-side">
            {fotos.slice(1, 3).map((foto, i) => (
              <button
                type="button"
                className="dt-galeria-thumb"
                key={foto}
                onClick={() => setVisor(i + 1)}
                aria-label={`Ver foto ${i + 2} de ${fotos.length}`}
              >
                <img src={foto} alt={`${paquete.titulo} foto ${i + 2}`} loading="lazy" />
                {i === 1 && (
                  <span className="dt-galeria-mas-n" aria-hidden="true"><b>{fotos.length}</b><small>fotos</small><em>Ver m&aacute;s</em></span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="detalle-layout">
          <div className="detalle-main">
            <div className="dt-ficha-row">
              <div className="dt-ficha"><span aria-hidden="true">&#9719;</span><strong>{paquete.duracion}</strong><small>Duraci&oacute;n</small></div>
              <div className="dt-ficha"><span aria-hidden="true">&#8982;</span><strong>{paquete.ubicacion}</strong><small>Ubicaci&oacute;n</small></div>
              <div className="dt-ficha"><span aria-hidden="true">&#10022;</span><strong>{(paquete.socios || [paquete.socio]).join(', ')}</strong><small>{listaSocios.length > 1 ? 'Convenios' : 'Convenio'}</small></div>
            </div>

            <section className="detalle-bloque">
              <h2>Sobre esta experiencia</h2>
              <p className="detalle-descripcion">{paquete.descripcion}</p>
              <div className="dt-cita">
                {`Una experiencia de ${paquete.categoria.toLowerCase()} en ${paquete.ubicacion}, junto a ${(paquete.socios || [paquete.socio]).join(', ')}.`}
              </div>
            </section>

            <section className="detalle-bloque">
              <h2>Lo m&aacute;s destacado</h2>
              <div className="detalle-highlights">
                {destacados.map(item => (
                  <div className="detalle-highlight" key={item}>
                    <span className="detalle-check" aria-hidden="true">&#10003;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {Array.isArray(paquete.itinerario) && paquete.itinerario.length > 0 && (
              <section className="detalle-bloque">
                <div className="detalle-bloque-head">
                  <h2>Itinerario de la experiencia</h2>
                  <span className="detalle-etapas">{paquete.itinerario.length} etapas</span>
                </div>
                <div className="detalle-timeline">
                  {paquete.itinerario.map((parada, i) => (
                    <div className="detalle-parada" key={`${parada.hora}-${i}`}>
                      <span className="detalle-hora">{parada.hora}</span>
                      <h3>{parada.titulo}</h3>
                      {parada.texto && <p>{parada.texto}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="detalle-bloque">
              <h2>Especificaciones claras</h2>
              <div className="detalle-especs">
                <div className="detalle-incluye">
                  <h3>Qu&eacute; incluye el paquete</h3>
                  <ul>
                    {paquete.incluye.map(item => (
                      <li key={item}>&#10003; {item}</li>
                    ))}
                  </ul>
                </div>
                <div className="detalle-no-incluye">
                  <h3>Qu&eacute; no incluye</h3>
                  <ul>
                    {(paquete.noIncluye || NO_INCLUYE_GENERICO).map(item => (
                      <li key={item}>&#10005; {item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="detalle-bloque">
              <h2>Recomendaciones para el d&iacute;a</h2>
              <div className="detalle-reco-grid">
                {RECOMENDACIONES.map(item => (
                  <div className="detalle-reco" key={item}>{item}</div>
                ))}
              </div>
            </section>

            <section className="detalle-bloque">
              <h2>{listaSocios.length > 1 ? 'Estos convenios ofrecen este paquete:' : 'Este paquete es ofrecido por:'}</h2>
              <div className="detalle-convenios-lista">
                {(mostrarConvenios ? listaSocios : listaSocios.slice(0, 3)).map(nombre => {
                  const c = conveniosEcoturismo.find(x => x.nombre === nombre);
                  return (
                    <div className="detalle-convenio-card detalle-convenio-compacto" key={nombre}>
                      {c && (
                        <img
                          src={`${process.env.PUBLIC_URL}/assets/partners/${c.logo}`}
                          alt={`Logo de ${c.nombre}`}
                          loading="lazy"
                        />
                      )}
                      <div>
                        <strong>{nombre}</strong>
                        <p>{c ? c.descripcion : 'Convenio local de Manaure Vive.'}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {listaSocios.length > 3 && (
                <button type="button" className="detalle-convenios-vermas" onClick={() => setMostrarConvenios(v => !v)} aria-expanded={mostrarConvenios}>
                  {mostrarConvenios ? 'Mostrar menos' : `Ver los ${listaSocios.length} convenios (3 de ${listaSocios.length})`}
                </button>
              )}
              <a className="detalle-convenios-todos" href="#convenios">Ver todos los convenios &rarr;</a>
            </section>

            <section className="detalle-bloque">
              <span className="eyebrow">PREGUNTAS FRECUENTES</span>
              <h2>Resolvemos tus dudas antes de que reserves</h2>
              <div className="detalle-questions">
                {preguntas.map(([pregunta, respuesta], indice) => {
                  const abierta = preguntaAbierta === indice;
                  return (
                    <article className={`detalle-question${abierta ? ' open' : ''}`} key={pregunta}>
                      <button type="button" onClick={() => setPreguntaAbierta(abierta ? null : indice)} aria-expanded={abierta}>
                        {pregunta}<span aria-hidden="true">{abierta ? '\u2212' : '+'}</span>
                      </button>
                      {abierta && <p>{respuesta}</p>}
                    </article>
                  );
                })}
              </div>
            </section>

            <section className="detalle-bloque detalle-relacionados">
              <div className="detalle-bloque-head">
                <h2>Tambi&eacute;n te puede interesar</h2>
                <a className="detalle-convenios-todos" href="#paquetes-todos">Ver todos &rarr;</a>
              </div>
              <div className="detalle-rel-grid">
                {paquetesEcoturismo.filter(p => p.titulo !== paquete.titulo).sort((a, b) => ((b.categoria === paquete.categoria) - (a.categoria === paquete.categoria))).slice(0, 3).map(rel => {
                  const idx = paquetesEcoturismo.indexOf(rel);
                  return (
                    <a className="detalle-rel-card" key={rel.titulo} href={`#paquete/${idx}`}>
                      <img src={rel.imagen} alt={rel.titulo} loading="lazy" />
                      <div>
                        <strong>{rel.titulo}</strong>
                        <span>{rel.precio ? `Desde ${rel.precio}` : 'Consultar precio'}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="detalle-aside">
            <div className="detalle-reserva-card">
              <span className="detalle-reserva-label">{tienePrecio ? 'Tarifa por persona' : 'Tarifa'}</span>
              <div className="detalle-reserva-precio">
                <div>
                  <strong>{tienePrecio ? formatoCOP(precioAdulto) : 'Consultar'}</strong>
                  {tienePrecio && <span className="detalle-reserva-adulto"> / adulto</span>}
                </div>
                {tienePrecio && (
                  <div className="detalle-reserva-ninos">
                    <span>Ni&ntilde;os: {formatoCOP(precioNino)}</span>
                    <span>Beb&eacute;s (0-2): Gratis</span>
                  </div>
                )}
              </div>

              <label className="detalle-field-label">1. Selecciona la fecha</label>
              <input
                type="date"
                value={fecha}
                min={hoyISO()}
                onChange={e => setFecha(e.target.value)}
                className="dt-input"
              />

              <span className="detalle-field-label">2. &iquest;Qui&eacute;nes viajan?</span>
              <div className="dt-viajeros">{bloqueViajeros}</div>

              <span className="detalle-field-label">3. Datos de contacto y recogida</span>
              <div className="dt-datos">{bloqueDatos}</div>

              {bloqueTotal}

              <a
                className="detalle-btn-primary"
                href={reservaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar ahora <span aria-hidden="true">&rarr;</span>
              </a>
              <a
                className="detalle-btn-wsp"
                href={reservaUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar por WhatsApp
              </a>
              {onReservar && (
                <button type="button" className="detalle-btn-ghost" onClick={onReservar}>
                  o reservar con el paso a paso
                </button>
              )}
              <p className="detalle-confianza">Sin pagos por adelantado &middot; Confirmaci&oacute;n por WhatsApp</p>
            </div>
          </aside>
        </div>
      </div>

      <div className="detalle-barra">
        <div className="detalle-barra-inner">
          <div className="detalle-barra-precio">
            <span>{tienePrecio ? 'Desde' : 'Precio'}</span>
            <strong>{tienePrecio ? formatoCOP(precioAdulto) : 'Consultar'}</strong>
          </div>
          <button type="button" className="detalle-barra-btn" onClick={() => setModalAbierto(true)}>
            Personalizar y reservar
          </button>
        </div>
      </div>

      {modalAbierto && (
        <div className="detalle-modal-backdrop" onClick={() => setModalAbierto(false)}>
          <div className="detalle-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Personalizar reserva">
            <div className="detalle-modal-head">
              <h3>Personalizar tu reserva</h3>
              <button type="button" onClick={() => setModalAbierto(false)} aria-label="Cerrar">&times;</button>
            </div>
            <label className="detalle-field-label">Fecha de la experiencia</label>
            <input
              type="date"
              value={fecha}
              min={hoyISO()}
              onChange={e => setFecha(e.target.value)}
              className="dt-input"
            />
            <span className="detalle-field-label">&iquest;Qui&eacute;nes viajan?</span>
            <div className="dt-viajeros">{bloqueViajeros}</div>
            <span className="detalle-field-label">Datos del cliente</span>
            <div className="dt-datos">{bloqueDatos}</div>
            {bloqueTotal}
            <a
              className="detalle-btn-primary"
              href={reservaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Confirmar por WhatsApp <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      )}

      {fotoVisor && (
        <div
          className="dt-visor"
          onClick={() => setVisor(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Vista de foto"
          style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0, zIndex: 1400, display: 'grid', placeItems: 'center', background: 'rgba(220, 235, 217, 0.72)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' }}
        >
          <button
            type="button"
            className="dt-visor-cerrar"
            onClick={() => setVisor(null)}
            aria-label="Cerrar"
            style={{ position: 'absolute', top: 18, right: 18, width: 40, height: 40, border: 0, borderRadius: 999, background: '#06452f', color: '#fff', fontSize: 18, fontWeight: 800, cursor: 'pointer' }}
          >
            &times;
          </button>
          <button
            type="button"
            className="dt-visor-nav dt-visor-ant"
            onClick={e => { e.stopPropagation(); setVisor((visor - 1 + fotos.length) % fotos.length); }}
            aria-label="Foto anterior"
            style={{ position: 'absolute', top: '50%', left: 16, width: 44, height: 44, border: 0, borderRadius: 999, background: 'rgba(255, 253, 248, 0.92)', color: '#06452f', fontSize: 18, fontWeight: 800, cursor: 'pointer', transform: 'translateY(-50%)', boxShadow: '0 8px 20px rgba(20, 40, 28, 0.25)' }}
          >
            &larr;
          </button>
          <img
            src={fotoVisor}
            alt={paquete.titulo}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '88vw', maxHeight: '80vh', borderRadius: 16, objectFit: 'contain', boxShadow: '0 24px 60px rgba(20, 40, 28, 0.35)' }}
          />
          <button
            type="button"
            className="dt-visor-nav dt-visor-sig"
            onClick={e => { e.stopPropagation(); setVisor((visor + 1) % fotos.length); }}
            aria-label="Foto siguiente"
            style={{ position: 'absolute', top: '50%', right: 16, width: 44, height: 44, border: 0, borderRadius: 999, background: 'rgba(255, 253, 248, 0.92)', color: '#06452f', fontSize: 18, fontWeight: 800, cursor: 'pointer', transform: 'translateY(-50%)', boxShadow: '0 8px 20px rgba(20, 40, 28, 0.25)' }}
          >
            &rarr;
          </button>
          <span
            className="dt-visor-cuenta"
            style={{ position: 'absolute', bottom: 20, left: '50%', padding: '6px 16px', borderRadius: 999, background: 'rgba(6, 69, 47, 0.9)', color: '#fff', fontSize: 12, fontWeight: 700, transform: 'translateX(-50%)' }}
          >
            {visor + 1} / {fotos.length}
          </span>
        </div>
      )}
    </main>
  );
}

export default DetallePaquete;
