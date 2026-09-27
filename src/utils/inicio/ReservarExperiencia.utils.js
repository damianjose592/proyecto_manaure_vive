export const NUMERO_WHATSAPP = '573012706114';

export const pasosReserva = [
  {
    numero: 1,
    etiqueta: 'Experiencia',
    titulo: '\u00bfQu\u00e9 vas a vivir?',
    descripcion: 'Elige la experiencia, la fecha y la hora que m\u00e1s te gusten.',
  },
  {
    numero: 2,
    etiqueta: 'Tus datos',
    titulo: '\u00bfCon qui\u00e9n vamos?',
    descripcion: 'Cu\u00e9ntanos tus datos y cu\u00e1ntas personas ser\u00e1n.',
  },
  {
    numero: 3,
    etiqueta: 'Confirmaci\u00f3n',
    titulo: 'Revisa y confirma',
    descripcion: 'Revisa el resumen y env\u00edalo por WhatsApp para confirmar tu cupo.',
  },
];

export const franjasHorarias = [
  { valor: '08:00', etiqueta: '8:00 AM', descripcion: 'Salida de ma\u00f1ana' },
  { valor: '10:00', etiqueta: '10:00 AM', descripcion: 'Ma\u00f1ana' },
  { valor: '14:00', etiqueta: '2:00 PM', descripcion: 'Tarde' },
  { valor: '16:00', etiqueta: '4:00 PM', descripcion: 'Tarde' },
];

export const opcionesPersonas = [1, 2, 3, 4, 5, 6, 8, 10];

export const obtenerProximosDias = (cantidad = 21) => {
  const dias = ['dom', 'lun', 'mar', 'mi\u00e9', 'jue', 'vie', 's\u00e1b'];
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  const hoy = new Date();
  const lista = [];
  for (let i = 1; i <= cantidad; i += 1) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + i);
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    const dia = String(d.getDate()).padStart(2, '0');
    lista.push({
      valor: `${d.getFullYear()}-${mes}-${dia}`,
      etiqueta: `${dias[d.getDay()]} ${d.getDate()} ${meses[d.getMonth()]}`,
    });
  }
  return lista;
};

export const construirMensajeReserva = ({
  paquete,
  fecha,
  hora,
  personas,
  nombre,
  telefono,
  observaciones,
}) => {
  const lineas = [
    `Hola, quiero reservar: ${(paquete && paquete.titulo) || ''}.`,
    `Fecha: ${fecha}`,
    hora ? `Hora: ${hora}` : '',
    `Ubicaci\u00f3n: ${(paquete && paquete.ubicacion) || ''}`,
    `Convenio: ${(paquete && paquete.socio) || ''}`,
    paquete && paquete.precio ? `Precio: ${paquete.precio}` : '',
    `Personas: ${personas}`,
  ];
  if (nombre) lineas.push(`Nombre: ${nombre}`);
  if (telefono) lineas.push(`Tel\u00e9fono: ${telefono}`);
  if (observaciones) lineas.push(`Notas: ${observaciones}`);
  return lineas.filter(Boolean).join('\n');
};

export const construirUrlWhatsApp = mensaje =>
  `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;

export const precioPorPersona = paquete => {
  if (!paquete || !paquete.precio) return null;
  const numero = Number(String(paquete.precio).replace(/[^0-9]/g, ''));
  return Number.isFinite(numero) && numero > 0 ? numero : null;
};

export const formatoCOP = valor => `$${valor.toLocaleString('es-CO')}`;
