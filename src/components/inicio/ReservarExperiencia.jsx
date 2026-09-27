import { useEffect, useRef, useState } from 'react';
import '../../styles/inicio/ReservarExperiencia.css';
import { paquetesEcoturismo } from '../../utils/inicio/Ecoturismo.utils';
import {
  pasosReserva,
  franjasHorarias,
  opcionesPersonas,
  obtenerProximosDias,
  construirMensajeReserva,
  construirUrlWhatsApp,
  precioPorPersona,
  formatoCOP,
} from '../../utils/inicio/ReservarExperiencia.utils';

function formatearEtiquetaDia(dias, valor) {
  const dia = dias.find(d => d.valor === valor);
  return dia ? dia.etiqueta : valor;
}

function formatearEtiquetaHora(franjas, valor) {
  const franja = franjas.find(f => f.valor === valor);
  return franja ? franja.etiqueta : valor;
}

function Desplegable({ etiqueta, valor, opciones, onCambiar, textoVacio }) {
  const [abierto, setAbierto] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!abierto) return;
    const cerrarAfuera = e => {
      if (ref.current && !ref.current.contains(e.target)) setAbierto(false);
    };
    const cerrarTecla = e => {
      if (e.key === 'Escape') setAbierto(false);
    };
    document.addEventListener('mousedown', cerrarAfuera);
    document.addEventListener('touchstart', cerrarAfuera);
    document.addEventListener('keydown', cerrarTecla);
    return () => {
      document.removeEventListener('mousedown', cerrarAfuera);
      document.removeEventListener('touchstart', cerrarAfuera);
      document.removeEventListener('keydown', cerrarTecla);
    };
  }, [abierto]);

  const actual = opciones.find(o => o.valor === valor);

  const elegir = v => {
    onCambiar(v);
    setAbierto(false);
  };

  return (
    <div className="reserva-drop" ref={ref}>
      <button
        type="button"
        className={`reserva-drop-btn${abierto ? ' open' : ''}${actual ? '' : ' vacio'}`}
        onClick={() => setAbierto(v => !v)}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-label={etiqueta}
      >
        <span className="reserva-drop-texto">{actual ? actual.etiqueta : textoVacio}</span>
        <span className="reserva-drop-flecha" aria-hidden="true" />
      </button>
      {abierto && (
        <ul className="reserva-drop-lista" role="listbox" aria-label={etiqueta}>
          {opciones.map(o => (
            <li
              key={o.valor}
              role="option"
              aria-selected={o.valor === valor}
              className={o.valor === valor ? 'seleccionada' : ''}
              onClick={() => elegir(o.valor)}
            >
              {o.etiqueta}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ReservarExperiencia({ paqueteInicial = null, onCerrar, mostrarVolver = true, etiquetaVolver = 'Volver a experiencias' }) {
  const [paso, setPaso] = useState(0);
  const [experiencia, setExperiencia] = useState(() =>
    paqueteInicial ? paqueteInicial.titulo : ''
  );
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [personas, setPersonas] = useState(2);
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [errorNombre, setErrorNombre] = useState(false);
  const [errorTelefono, setErrorTelefono] = useState(false);

  const diasDisponibles = obtenerProximosDias(21);

  const paqueteElegido = paquetesEcoturismo.find(p => p.titulo === experiencia) || null;
  const precioRef = precioPorPersona(paqueteElegido);
  const totalEstimado = precioRef ? precioRef * personas : null;

  const puedeContinuarPaso1 =
    Boolean(experiencia) && Boolean(fecha) && personas > 0;
  const telefonoDigitos = telefono.replace(/[^0-9]/g, '');

  const avanzar = () => {
    if (paso === 0 && !puedeContinuarPaso1) return;
    if (paso === 1) {
      const nombreOk = nombre.trim().length >= 2;
      const telefonoOk = telefonoDigitos.length >= 10;
      setErrorNombre(!nombreOk);
      setErrorTelefono(!telefonoOk);
      if (!nombreOk || !telefonoOk) return;
    }
    setErrorNombre(false);
    setErrorTelefono(false);
    setPaso(p => p + 1);
  };

  const retroceder = () => setPaso(p => (p > 0 ? p - 1 : 0));

  const aperturarWhatsApp = () => {
    const mensaje = construirMensajeReserva({
      paquete: paqueteElegido,
      fecha,
      hora,
      personas,
      nombre,
      telefono,
      observaciones,
    });
    window.open(construirUrlWhatsApp(mensaje), '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="reserva-wizard">
      <section className="reserva-wizard-inner">
        {mostrarVolver && (
        <div className="reserva-wizard-head">
          <button type="button" className="reserva-back" onClick={onCerrar}>
            {paso === 2 ? etiquetaVolver : <>&larr; {etiquetaVolver}</>}
          </button>
        </div>
        )}

        <div className="reserva-steps" role="tablist" aria-label="Pasos de la reserva">
          {pasosReserva.map((pasoInfo, indice) => (
            <div
              key={pasoInfo.numero}
              className={`reserva-steps-item${indice <= paso ? ' active' : ''}`}
              role="tab"
              aria-selected={indice === paso}
            >
              <span className="reserva-steps-number">{pasoInfo.numero}</span>
              <span className="reserva-steps-label">{pasoInfo.etiqueta}</span>
            </div>
          ))}
        </div>

        <div className="reserva-heading">
          <span className="eyebrow">PASO {paso + 1} DE 3</span>
          <h1>{pasosReserva[paso].titulo}</h1>
          <p>{pasosReserva[paso].descripcion}</p>
        </div>

        {paso === 0 && (
          <div className="reserva-step-body">
            <label className="reserva-field">
              <span className="reserva-field-label">Experiencia a vivir</span>
              <Desplegable
                etiqueta="Experiencia a vivir"
                valor={experiencia}
                textoVacio="Elige una experiencia"
                onCambiar={setExperiencia}
                opciones={paquetesEcoturismo.map(p => ({ valor: p.titulo, etiqueta: `${p.titulo} - ${p.socio}` }))}
              />
            </label>

            <div className="reserva-row">
              <label className="reserva-field">
                <span className="reserva-field-label">Fecha</span>
                <Desplegable
                  etiqueta="Fecha"
                  valor={fecha}
                  textoVacio="Elige el d&iacute;a"
                  onCambiar={setFecha}
                  opciones={diasDisponibles}
                />
              </label>

              <label className="reserva-field">
                <span className="reserva-field-label">Hora (opcional)</span>
                <Desplegable
                  etiqueta="Hora"
                  valor={hora}
                  textoVacio="Elige la hora"
                  onCambiar={setHora}
                  opciones={franjasHorarias.map(f => ({ valor: f.valor, etiqueta: `${f.etiqueta} - ${f.descripcion}` }))}
                />
              </label>
            </div>

            <label className="reserva-field">
                <span className="reserva-field-label">&iquest;Cu&aacute;ntas personas?</span>
                <div className="reserva-personas">
                  {opcionesPersonas.map(n => (
                    <button
                      key={n}
                      type="button"
                      className={`reserva-persona${n === personas ? ' active' : ''}`}
                      onClick={() => setPersonas(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>
                {totalEstimado ? (
                  <p className="reserva-estimado">Estimado: <strong>{formatoCOP(totalEstimado)}</strong> <small>({personas} {personas === 1 ? 'persona' : 'personas'} &middot; precio de referencia)</small></p>
                ) : (
                  <p className="reserva-estimado">Precio a convenir por WhatsApp.</p>
                )}
              </label>
          </div>
        )}

        {paso === 1 && (
          <div className="reserva-step-body">
              <label className="reserva-field">
                <span className="reserva-field-label">Tu nombre</span>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => { setNombre(e.target.value); if (errorNombre) setErrorNombre(false); }}
                  placeholder="&iquest;C&oacute;mo te llamas?"
                  className="reserva-input"
                  aria-invalid={errorNombre}
                />
                {errorNombre && <p className="reserva-error">Escribe tu nombre.</p>}
              </label>

            <label className="reserva-field">
                <span className="reserva-field-label">Tel&eacute;fono de contacto</span>
                <input
                  type="tel"
                  inputMode="tel"
                  value={telefono}
                  onChange={e => { setTelefono(e.target.value); if (errorTelefono) setErrorTelefono(false); }}
                  placeholder="Ej: 3123456789"
                  className="reserva-input"
                  aria-invalid={errorTelefono}
                />
                {errorTelefono && <p className="reserva-error">Escribe un numero de 10 digitos.</p>}
              </label>

            <label className="reserva-field">
              <span className="reserva-field-label">Observaciones (opcional)</span>
              <textarea
                value={observaciones}
                onChange={e => setObservaciones(e.target.value)}
                placeholder="Algo que quieras contarnos"
                className="reserva-textarea"
                rows="3"
              />
            </label>
          </div>
        )}

        {paso === 2 && (
          <div className="reserva-step-body reserva-resumen">
              <div className="reserva-resumen-card">
                <h3>{paqueteElegido ? paqueteElegido.titulo : experiencia}</h3>
                <p>{personas} {personas === 1 ? 'persona' : 'personas'}</p>
                <p>{fecha ? formatearEtiquetaDia(diasDisponibles, fecha) : ''}</p>
                <p>{hora ? formatearEtiquetaHora(franjasHorarias, hora) : 'Hora a convenir'}</p>
                {totalEstimado && <p><strong>Total estimado: {formatoCOP(totalEstimado)}</strong> (referencia)</p>}
                {nombre && <p>{nombre}</p>}
              {telefono && <p>{telefono}</p>}
              {observaciones && <p>{observaciones}</p>}
            </div>

            <p className="reserva-aviso">
              Al enviar, se abrir&aacute; WhatsApp con los datos de tu reserva para confirmar contigo.
            </p>
          </div>
        )}

        <div className="reserva-wizard-footer">
          {paso > 0 && (
            <button type="button" className="reserva-btn reserva-btn-ghost" onClick={retroceder}>
              &larr; Atr&aacute;s
            </button>
          )}
          {paso < 2 ? (
            <button
              type="button"
              className="reserva-btn"
              onClick={avanzar}
              disabled={paso === 0 && !puedeContinuarPaso1}
            >
              {paso === 1 ? 'Ver resumen' : 'Continuar'} <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button type="button" className="reserva-btn" onClick={aperturarWhatsApp}>
              Enviar por WhatsApp <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </section>
    </main>
  );
}

export default ReservarExperiencia;
