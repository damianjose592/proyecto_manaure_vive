import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.location.hash = '';
});

test('renders the Manaure Vive hero heading', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /Naturaleza, cultura, gastronomía y experiencias/i })).toBeInTheDocument();
});

test('clicking a showcase gallery image opens the full gallery view', async () => {
  window.location.hash = '';
  render(<App />);

  const previewImage = screen.getAllByAltText(/Experiencia de aventura en Manaure/i)[0];
  fireEvent.click(previewImage);

  expect(window.location.hash).toBe('#galeria');
  expect(await screen.findByRole('dialog', { name: /Aventura en Manaure/i })).toBeInTheDocument();

  fireEvent.click(screen.getByRole('tab', { name: /^Naturaleza$/i }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

test('featured cards open the complete package detail view', async () => {
  render(<App />);

  const detailsButtons = screen.getAllByRole('button', { name: /ver detalles/i });
  expect(detailsButtons.length).toBeGreaterThan(0);

  fireEvent.click(detailsButtons[0]);
  expect(window.location.hash).toBe('#paquete/0');
  expect(await screen.findByRole('heading', { name: /Adrenalina Serrana/i }, { timeout: 3000 })).toBeInTheDocument();
  expect(screen.getByText(/incluye el paquete/i)).toBeInTheDocument();
});

test('returning from a package to experiences shows the landing content', async () => {
  render(<App />);

  fireEvent.click(screen.getAllByRole('button', { name: /ver detalles/i })[0]);
  await screen.findByRole('heading', { name: /Adrenalina Serrana/i }, { timeout: 3000 });

  fireEvent.click(screen.getAllByRole('link', { name: /^Experiencias$/i })[0]);
  expect(await screen.findByRole('heading', { name: /Descubre tu experiencia/i })).toBeInTheDocument();
});
 
