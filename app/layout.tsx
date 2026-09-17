// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'BandungSpectum — Spesialis Kaca Film Arsitektur Gedung, Rumah & Mobil Bandung',
    template: '%s | BandungSpectum Kaca Film',
  },
  description: 'Jasa pemasangan kaca film profesional di Bandung. Tolak panas 95%, UV rejection 99%, privasi maksimal. Melayani kaca film gedung perkantoran, rumah tinggal, mobil, ruko komersial, dan gedung bertingkat. Gratis survei & konsultasi. Hubungi 0896-3703-3005.',
  keywords: [
    'kaca film bandung',
    'jasa pasang kaca film bandung',
    'kaca film gedung',
    'kaca film rumah',
    'kaca film mobil',
    'kaca film tolak panas',
    'kaca film UV rejection',
    'kaca film privasi',
    'kaca film arsitektur',
    'kaca film dekoratif',
    'kaca film keamanan',
    'kaca film thermal',
    'pasang kaca film bandung',
    'harga kaca film bandung',
    'kaca film gedung perkantoran',
    'kaca film rumah minimalis',
    'kaca film mobil terbaik',
    'kaca film 3M',
    'kaca film Solar Gard',
    'kaca film Huper Optik',
    'kaca film V-Kool',
    'kaca film Iceberg',
    'spesialis kaca film',
    'tukang kaca film bandung',
    'kontraktor kaca film',
    'installasi kaca film',
    'servis kaca film',
    'kaca film anti pecah',
    'kaca film stabilitas',
    'kaca film energi hemat',
    'kaca film AC hemat',
    'kaca film ruko',
    'kaca film toko',
    'kaca film apartemen',
    'kaca film hotel',
    'kaca film rumah sakit',
    'kaca film sekolah',
    'kaca film kantor',
    'kaca film wilayah Bandung',
    'kaca film Jawa Barat',
    'Bandung kaca film',
    'film penolak panas',
    'sun control film',
    'window film bandung',
    'solar control film',
    'safety film bandung',
    'decorative film',
    'privacy film',
  ],
  authors: [{ name: 'BandungSpectum' }],
  creator: 'BandungSpectum',
  publisher: 'BandungSpectum',
  metadataBase: new URL('https://bandungspectum.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://bandungspectum.vercel.app',
    siteName: 'BandungSpectum Kaca Film',
    title: 'BandungSpectum — Spesialis Kaca Film Arsitektur Gedung, Rumah & Mobil Bandung',
    description: 'Jasa pemasangan kaca film profesional di Bandung. Tolak panas 95%, UV rejection 99%, privasi maksimal. Melayani gedung, rumah, mobil, ruko. Gratis survei & konsultasi.',
    images: [
      {
        url: '/logo.jpeg',
        width: 1200,
        height: 630,
        alt: 'BandungSpectum Spesialis Kaca Film Bandung',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BandungSpectum — Spesialis Kaca Film Bandung',
    description: 'Jasa pemasangan kaca film profesional di Bandung. Tolak panas 95%, UV rejection 99%. Gedung, rumah, mobil.',
    images: ['/logo.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpeg',
    shortcut: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
  verification: {
    google: 'nZh7t1SMlAfbBYke0D50JD5hrk',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'BandungSpectum',
    description: 'Jasa pemasangan kaca film profesional di Bandung. Tolak panas 95%, UV rejection 99%, privasi maksimal.',
    url: 'https://bandungspectum.vercel.app',
    telephone: '+6289637033005',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Sangkuriang Barat 3, Puri Cipageran Indah 1 Blok F gg Madrasah 1',
      addressLocality: 'Bandung',
      addressRegion: 'Jawa Barat',
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -6.8771,
      longitude: 107.6165,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    priceRange: '$$',
    image: '/logo.jpeg',
    sameAs: [],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Layanan Pemasangan Kaca Film',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaca Film Gedung Perkantoran',
            description: 'Pemasangan kaca film untuk gedung perkantoran, mall, dan gedung komersial. Tolak panas hingga 95%.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaca Film Rumah',
            description: 'Pemasangan kaca film untuk rumah tinggal. Privasi terjaga, nyaman sepanjang hari.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaca Film Mobil',
            description: 'Pemasangan kaca film untuk mobil. Perlindungan UV, kabin lebih sejuk, tampilan elegan.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaca Film Dekoratif',
            description: 'Pemasangan kaca film dekoratif dengan berbagai pilihan motif dan warna.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaca Film Keamanan',
            description: 'Pemasangan kaca film keamanan anti pecah untuk toko, ruko, dan gedung.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kaca Film Thermal',
            description: 'Pemasangan kaca film thermal untuk penolakan panas infrared dan hemat energi.',
          },
        },
      ],
    },
  };

  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
