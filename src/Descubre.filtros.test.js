import { fireEvent, render, screen, within } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.location.hash = '#descubre';
});

const numEnBoton = () => {
  const btn = screen.getByRole('button', { name: /ver paquetes/i });
  return within(btn).getByText(/^\d+$/).textContent;
};

test('sin opcion huerfana: Medio dia no existe y todo cuenta 6', () => {
  render(<App />);
  expect(screen.queryByRole('button', { name: /medio/i })).not.toBeInTheDocument();
  expect(numEnBoton()).toBe('6');
});

test('toggle-off y limpiar filtros recuperan el estado', () => {
  render(<App />);
  const dia = screen.getByRole('button', { name: /completo/i });
  fireEvent.click(dia);
  expect(dia.className).toMatch(/active/);
  fireEvent.click(dia);
  expect(dia.className).not.toMatch(/active/);

  const nat = screen.getByRole('button', { name: /naturaleza/i });
  const finde = screen.getByRole('button', { name: /fin de semana/i });
  fireEvent.click(nat);
  fireEvent.click(finde);
  expect(numEnBoton()).toBe('1');

  const limpiar = screen.getAllByRole('button', { name: /limpiar filtros/i })[0];
  fireEvent.click(limpiar);
  expect(nat.className).not.toMatch(/active/);
  expect(finde.className).not.toMatch(/active/);
  expect(numEnBoton()).toBe('6');
});

test('naturaleza + fin de semana devuelve la Expedicion Metallura', async () => {
  render(<App />);
  fireEvent.click(screen.getByRole('button', { name: /naturaleza/i }));
  fireEvent.click(screen.getByRole('button', { name: /fin de semana/i }));
  fireEvent.click(screen.getByRole('button', { name: /ver paquetes/i }));
  expect(await screen.findByRole('heading', { name: /edici.*metallura/i }, { timeout: 5000 })).toBeInTheDocument();
}, 15000);

test('tras buscar, el contenido vuelve a ser visible (reveal)', async () => {  const OriginalIO = window.IntersectionObserver;
  window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe(el) { this.cb([{ isIntersecting: true, target: el }], this); }
    unobserve() {}
    disconnect() {}
  };
  try {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /ver paquetes/i }));
    const titulo = await screen.findByRole('heading', { name: /paquetes recomendados/i }, { timeout: 5000 });
    expect(titulo.closest('section').className).toMatch(/is-visible/);
  } finally {
    if (OriginalIO === undefined) { delete window.IntersectionObserver; }
    else { window.IntersectionObserver = OriginalIO; }
  }
}, 15000);

test('circulo de experiencia abre el filtro con el tema marcado', () => {
  window.location.hash = '#inicio';
  const primera = render(<App />);
  const circulo = screen.getByRole('link', { name: /^naturaleza$/i });
  expect(circulo.getAttribute('href')).toBe('#descubre/naturaleza');
  primera.unmount();
  window.location.hash = '#descubre/naturaleza';
  render(<App />);
  expect(screen.getByRole('button', { name: /^naturaleza$/i }).className).toMatch(/active/);
});

test('movil: grupos en acordeon cerrado por defecto', () => {
  const OriginalMM = window.matchMedia;
  window.matchMedia = () => ({ matches: true, media: '', addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
  try {
    window.location.hash = '#descubre';
    render(<App />);
    const acordeones = document.querySelectorAll('details.db-filter-group');
    expect(acordeones.length).toBe(4);
    acordeones.forEach(a => expect(a.open).toBe(false));
    expect(screen.getByRole('button', { name: /^naturaleza$/i })).toBeInTheDocument();
  } finally {
    if (OriginalMM === undefined) { delete window.matchMedia; }
    else { window.matchMedia = OriginalMM; }
  }
});
