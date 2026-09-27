import { useState } from 'react';

export const FILTROS_GALERIA = [
  {
    nombre: 'Todas',
    icono: {
      rects: [
        { x: 3, y: 3, width: 7, height: 7, rx: 1.5 },
        { x: 14, y: 3, width: 7, height: 7, rx: 1.5 },
        { x: 3, y: 14, width: 7, height: 7, rx: 1.5 },
        { x: 14, y: 14, width: 7, height: 7, rx: 1.5 },
      ],
    },
  },
  {
    nombre: 'Naturaleza',
    icono: {
      paths: ['M5 19C5 9 12 4 20 4c0 8-5 15-15 15z', 'M5 19c3-5 7-9 11-11'],
    },
  },
  {
    nombre: 'Aventura',
    icono: {
      paths: ['M3 18 9 7l4 6 2.5-3.5L21 18z'],
    },
  },
  {
    nombre: 'Gastronomía',
    icono: {
      paths: [
        'M6.5 2.5v5M11.5 2.5v5',
        'M6.5 7.5c0 2 1 3.5 2.5 3.5s2.5-1.5 2.5-3.5',
        'M9 11v10.5',
        'M16.5 2.5c-1.8 3.5-1.8 8 0 11v8',
      ],
    },
  },
  {
    nombre: 'Tours',
    icono: {
      rects: [{ x: 4, y: 3.5, width: 16, height: 12, rx: 2 }],
      paths: ['M4 10.5h16'],
      circles: [{ cx: 8, cy: 18.5, r: 1.8 }, { cx: 16, cy: 18.5, r: 1.8 }],
    },
  },
  {
    nombre: 'Cultura',
    icono: {
      paths: ['M3 9.5 12 3.5l9 6', 'M5 9.5V18M9.5 9.5V18M14.5 9.5V18M19 9.5V18', 'M2.5 18.5h19'],
    },
  },
  {
    nombre: 'Momentos',
    icono: {
      rects: [{ x: 3, y: 7, width: 18, height: 13, rx: 2 }],
      paths: ['M8.5 7 10 4.5h4L15.5 7'],
      circles: [{ cx: 12, cy: 13, r: 3.5 }],
    },
  },
];

export const COLORES_CATEGORIA = {
  Naturaleza: '#3b8a55',
  Aventura: '#F28C18',
  Gastronomía: '#c2571b',
  Tours: '#3d7890',
  Cultura: '#7c5cbf',
  Momentos: '#0e7c86',
};

const FOTOS_AVENTURA_LOCALES = Array.from({ length: 11 }, (_, indice) => ({
  titulo: 'Aventura en Manaure',
  categoria: 'Aventura',
  ubicacion: 'Manaure, Cesar',
  descripcion: 'Descubre los paisajes y experiencias de aventura que ofrece Manaure.',
  socio: 'Manaure Aventuras',
  socioLogo: `${process.env.PUBLIC_URL}/assets/partners/manaure-aventura.webp`,
  imagen: `${process.env.PUBLIC_URL}/assets/galeria/aventura/Manaure-aventuras/aventura${indice + 1}.jpeg`,
  alt: 'Experiencia de aventura en Manaure',
}));

const FOTOS_NATURALEZA_LOCALES = Array.from({ length: 13 }, (_, indice) => ({
  titulo: 'Naturaleza en Manaure',
  categoria: 'Naturaleza',
  ubicacion: 'Manaure, Cesar',
  descripcion: 'Conecta con los paisajes naturales y la biodiversidad de Manaure.',
  socio: 'Metallura',
  socioLogo: `${process.env.PUBLIC_URL}/assets/partners/metallura.webp`,
  imagen: `${process.env.PUBLIC_URL}/assets/galeria/Naturaleza/Metallura/naturaleza${indice + 1}.jpeg`,
  alt: 'Paisaje natural de Manaure',
}));

const FOTOS_GASTRONOMIA_LOCALES = [
  {
    titulo: 'Arepas de la tradición',
    categoria: 'Gastronomía',
    ubicacion: 'La Casa de las Arepas, Manaure',
    descripcion: 'Las arepas y los sabores locales de La Casa de las Arepas celebran la tradición, la calidez y el sabor del territorio.',
    socio: 'La Casa de las Arepas',
    socioLogo: `${process.env.PUBLIC_URL}/assets/partners/la-casa-de-las-arepas.webp`,
    tipo: 'imagen',
    imagen: `${process.env.PUBLIC_URL}/assets/galeria/Gastronomia/La casa de las arepas/gastronomia12.JPG`,
    alt: 'Arepas y gastronomía típica de Manaure',
  },
  {
    titulo: 'Sabor de la región',
    categoria: 'Gastronomía',
    ubicacion: 'La Casa de las Arepas, Manaure',
    descripcion: 'Preparaciones caseras que reflejan los sabores auténticos de la cocina local.',
    socio: 'La Casa de las Arepas',
    socioLogo: `${process.env.PUBLIC_URL}/assets/partners/la-casa-de-las-arepas.webp`,
    tipo: 'imagen',
    imagen: `${process.env.PUBLIC_URL}/assets/galeria/Gastronomia/La casa de las arepas/gastronomia8.jpg`,
    alt: 'Plato típico de la gastronomía de Manaure',
  },
  {
    titulo: 'Video de preparación',
    categoria: 'Gastronomía',
    ubicacion: 'La Casa de las Arepas, Manaure',
    descripcion: 'Momentos reales de la cocina local, con la calidez y la autenticidad que caracteriza a la casa.',
    socio: 'La Casa de las Arepas',
    socioLogo: `${process.env.PUBLIC_URL}/assets/partners/la-casa-de-las-arepas.webp`,
    tipo: 'video',
    imagen: `${process.env.PUBLIC_URL}/assets/galeria/Gastronomia/La casa de las arepas/gastronomia9.MOV`,
    alt: 'Video de preparación de la gastronomía local',
  },
  {
    titulo: 'Experiencia en cocina',
    categoria: 'Gastronomía',
    ubicacion: 'La Casa de las Arepas, Manaure',
    descripcion: 'Un vistazo al ambiente y a la preparación artesanal de los sabores del territorio.',
    socio: 'La Casa de las Arepas',
    socioLogo: `${process.env.PUBLIC_URL}/assets/partners/la-casa-de-las-arepas.webp`,
    tipo: 'video',
    imagen: `${process.env.PUBLIC_URL}/assets/galeria/Gastronomia/La casa de las arepas/gastronomia10.MOV`,
    alt: 'Video del ambiente culinario local',
  },
  {
    titulo: 'Sabor del día',
    categoria: 'Gastronomía',
    ubicacion: 'La Casa de las Arepas, Manaure',
    descripcion: 'Se comparte la esencia del sabor local en una experiencia auténtica y cercana.',
    socio: 'La Casa de las Arepas',
    socioLogo: `${process.env.PUBLIC_URL}/assets/partners/la-casa-de-las-arepas.webp`,
    tipo: 'video',
    imagen: `${process.env.PUBLIC_URL}/assets/galeria/Gastronomia/La casa de las arepas/gastronomia11.MOV`,
    alt: 'Video mostrando la gastronomía local de La Casa de las Arepas',
  },
];

export const FOTOS_GALERIA = [
  ...FOTOS_AVENTURA_LOCALES,
  ...FOTOS_NATURALEZA_LOCALES,
  ...FOTOS_GASTRONOMIA_LOCALES,
  {
    titulo: 'Paseo al río',
    categoria: 'Tours',
    ubicacion: 'Manaure, Cesar',
    descripcion: 'Navega las aguas tranquilas del río y disfruta un día de descanso total.',
    socio: 'Tours Manaure',
    imagen: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=800&q=80',
    alt: 'Río de aguas claras entre rocas y vegetación',
  },
  {
    titulo: 'Atardecer en Manaure',
    categoria: 'Momentos',
    ubicacion: 'Manaure, Cesar',
    descripcion: 'Cierra el día con un atardecer dorado sobre las montañas que nunca olvidarás.',
    socio: 'Fotografía Manaure',
    imagen: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    alt: 'Atardecer dorado sobre el campo',
  },
  {
    titulo: 'Café de la región',
    categoria: 'Gastronomía',
    ubicacion: 'Villa Adelaida',
    descripcion: 'Degusta el café cultivado en la región, de aroma intenso y sabor inconfundible.',
    socio: 'Villa Adelaida',
    imagen: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    alt: 'Taza de café junto a granos tostados',
  },
  {
    titulo: 'Tradición y gente',
    categoria: 'Cultura',
    ubicacion: 'Manaure, Cesar',
    descripcion: 'Conoce las costumbres, la arquitectura y la calidez de la gente de Manaure.',
    socio: 'Eventos Manaure',
    imagen: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80',
    alt: 'Casa tradicional de la región',
  },
];

export function useGaleria() {
  const [filtroActivo, setFiltroActivo] = useState('Todas');
  const fotosFiltradas =
    filtroActivo === 'Todas'
      ? FOTOS_GALERIA
      : FOTOS_GALERIA.filter(foto => foto.categoria === filtroActivo);

  return { filtroActivo, setFiltroActivo, fotosFiltradas };
}
