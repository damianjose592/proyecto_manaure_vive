import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.location.hash = '';
});

test('#descubre vive en el inicio sin redirigir', () => {
  window.location.hash = '#descubre';
  render(<App />);
  expect(window.location.hash).toBe('#descubre');
  expect(document.getElementById('descubre')).not.toBeNull();
  expect(screen.getByRole('heading', { name: /descubre tu experiencia/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /paquetes recomendados para ti/i })).toBeInTheDocument();
});

test('filtro incrustado filtra en vivo sin cambiar de hash', () => {
  window.location.hash = '#inicio';
  render(<App />);
  const seccion = document.getElementById('descubre');
  const nat = within(seccion).getByRole('button', { name: /naturaleza/i });
  fireEvent.click(nat);
  expect(window.location.hash).toBe('#inicio');
  expect(within(seccion).getByText(/se encontraron 1 paquete/i)).toBeInTheDocument();
  expect(within(seccion).getByRole('heading', { name: /edici.*metallura/i })).toBeInTheDocument();
});

test('detalle muestra ficha informativa con el estilo en color', async () => {
  window.location.hash = '#paquete/0';
  render(<App />);
  expect(await screen.findByRole('heading', { name: /as\u00ed se vive esta experiencia/i }, { timeout: 5000 })).toBeInTheDocument();
  expect(screen.getByLabelText(/adrenalina \(aplica a este paquete\)/i)).toBeInTheDocument();
}, 15000);
