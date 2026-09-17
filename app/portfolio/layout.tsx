import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Hasil Pemasangan Kaca Film',
  description: 'Lihat hasil pemasangan kaca film kami di berbagai proyek gedung perkantoran, rumah tinggal, ruko komersial, dan kendaraan di Bandung dan Jawa Barat.',
  keywords: 'portfolio kaca film, hasil pemasangan kaca film, proyek kaca film bandung, gallery kaca film',
  openGraph: {
    title: 'Portfolio Hasil Pemasangan Kaca Film | BandungSpectum',
    description: 'Lihat hasil pemasangan kaca film kami di berbagai proyek gedung, rumah, dan kendaraan di Bandung.',
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
