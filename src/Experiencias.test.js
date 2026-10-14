import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.location.hash = '';
});

test('#experiencias muestra el Colibrí sin redirigir', () => {
  window.location.hash = '#experiencias';
  render(<App />);
  expect(window.location.hash).toBe('#experiencias');
  expect(document.getElementById('experiencias')).not.toBeNull();
  expect(screen.getByTitle(/Pregúntale al Colibrí/i)).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /vive momentos/i })).toBeInTheDocument();
});

test('detalle muestra ficha informativa con el estilo en color', async () => {
  window.location.hash = '#paquete/0';
  render(<App />);
  expect(await screen.findByRole('heading', { name: /as\u00ed se vive esta experiencia/i }, { timeout: 5000 })).toBeInTheDocument();
  expect(screen.getByLabelText(/adrenalina \(aplica a este paquete\)/i)).toBeInTheDocument();
}, 15000);
