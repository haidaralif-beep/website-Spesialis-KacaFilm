import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Katalog Bahan Kaca Film',
  description: 'Katalog lengkap bahan kaca film berkualitas tinggi. Tersedia berbagai merek ternama seperti 3M, Solar Gard, Huper Optik, V-Kool, dan Iceberg. UV rejection 99%, heat rejection hingga 95%.',
  keywords: 'bahan kaca film, katalog kaca film, 3M kaca film, Solar Gard, Huper Optik, V-Kool, Iceberg, kaca film terbaik',
  openGraph: {
    title: 'Katalog Bahan Kaca Film | BandungSpectum',
    description: 'Katalog lengkap bahan kaca film berkualitas tinggi dari merek ternama.',
  },
};

export default function MaterialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
