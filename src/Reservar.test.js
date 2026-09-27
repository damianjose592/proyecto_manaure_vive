import { fireEvent, render, screen } from '@testing-library/react';
import ReservarExperiencia from './components/inicio/ReservarExperiencia';
import { paquetesEcoturismo } from './utils/inicio/Ecoturismo.utils';

const noop = () => {};

function elegirPrimeraOpcion(nombre) {
  fireEvent.click(screen.getByRole('button', { name: nombre }));
  fireEvent.click(screen.getAllByRole('option')[0]);
}

function irAPaso1() {
  render(<ReservarExperiencia paqueteInicial={paquetesEcoturismo[0]} onCerrar={noop} />);
  elegirPrimeraOpcion('Fecha');
  fireEvent.click(screen.getByRole('button', { name: /continuar/i }));
}

test('hora opcional: avanza sin hora y muestra estimado', () => {
  render(<ReservarExperiencia paqueteInicial={paquetesEcoturismo[0]} onCerrar={noop} />);
  elegirPrimeraOpcion('Fecha');
  const continuar = screen.getByRole('button', { name: /continuar/i });
  expect(continuar).not.toBeDisabled();
  expect(screen.getByText(/estimado/i)).toBeInTheDocument();
  fireEvent.click(continuar);
  expect(screen.getByPlaceholderText(/te llamas/i)).toBeInTheDocument();
});

test('paso 1 valida nombre y telefono con mensajes', () => {
  irAPaso1();
  fireEvent.click(screen.getByRole('button', { name: /ver resumen/i }));
  expect(screen.getByText(/escribe tu nombre/i)).toBeInTheDocument();
  expect(screen.getByText(/10 digitos/i)).toBeInTheDocument();
  fireEvent.change(screen.getByPlaceholderText(/te llamas/i), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByPlaceholderText(/3123456789/), { target: { value: '3001234567' } });
  expect(screen.queryByText(/escribe tu nombre/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/10 digitos/i)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /ver resumen/i }));
  expect(screen.getByText(/total estimado/i)).toBeInTheDocument();
});

test('resumen muestra total y hora a convenir sin hora', () => {
  irAPaso1();
  fireEvent.change(screen.getByPlaceholderText(/te llamas/i), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByPlaceholderText(/3123456789/), { target: { value: '3001234567' } });
  fireEvent.click(screen.getByRole('button', { name: /ver resumen/i }));
  expect(screen.getByText(/total estimado/i)).toBeInTheDocument();
  expect(screen.getByText(/hora a convenir/i)).toBeInTheDocument();
});

test('personas no se resetean al elegir (label no reenvia)', () => {
  render(<ReservarExperiencia paqueteInicial={paquetesEcoturismo[0]} onCerrar={noop} />);
  fireEvent.click(screen.getByRole('button', { name: '5' }));
  expect(screen.getByRole('button', { name: '5' }).className).toMatch(/active/);
  expect(screen.getByRole('button', { name: '1' }).className).not.toMatch(/active/);
});

test('movil: el desplegable tactil elige y cierra', () => {
  const OriginalMM = window.matchMedia;
  window.matchMedia = () => ({ matches: true, media: '', addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  try {
    render(<ReservarExperiencia paqueteInicial={paquetesEcoturismo[0]} onCerrar={noop} />);
    fireEvent.click(screen.getByRole('button', { name: 'Fecha' }));
    const opciones = screen.getAllByRole('option');
    expect(opciones.length).toBeGreaterThan(0);
    const texto = opciones[0].textContent;
    fireEvent.click(opciones[0]);
    expect(screen.queryByRole('option')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Fecha' })).toHaveTextContent(texto);
  } finally {
    if (OriginalMM === undefined) { delete window.matchMedia; }
    else { window.matchMedia = OriginalMM; }
  }
});
